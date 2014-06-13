(function($){

  // Function taken from Alexey Ten (https://github.com/alexeyten/qr-image)
  function matrix2path(matrix) {
    var N = matrix.length
    var filled = []
    for( var row = -1; row <= N; row++ )
      filled[row] = []

    var path = []
    for( var row = 0; row < N; row++ ) {
      for( var col = 0; col < N; col++ ) {
        if( filled[row][col] ) continue
        filled[row][col] = 1
        if( isDark(row, col) ) {
          if( !isDark(row-1, col) ) {
            path.push(plot(row, col, 'right'))
          }
        } else {
          if( isDark(row, col-1) ) {
            path.push(plot(row, col, 'down'))
          }
        }
      }
    }
    return path

    function isDark(row, col) {
      if( row < 0 || col < 0 || row >= N || col >= N ) return false
      return !!matrix[row][col]
    }

    function plot(row0, col0, dir) {
      filled[row0][col0] = 1
      var res = []
      res.push(['M',  col0, row0 ])
      var row = row0
      var col = col0
      var len = 0
      do {
        switch( dir ) {
          case 'right':
            filled[row][col] = 1
            if( isDark(row, col) ) {
              filled[row-1][col] = 1
              if( isDark(row-1, col) ) {
                res.push(['h', len])
                len = 0
                dir = 'up'
              } else {
                len++
                col++
              }
            } else {
              res.push(['h', len])
              len = 0
              dir = 'down'
            }
            break

          case 'left':
            filled[row-1][col-1] = 1
            if( isDark(row-1, col-1) ) {
              filled[row][col-1] = 1
              if( isDark(row, col-1) ) {
                res.push(['h', -len])
                len = 0
                dir = 'down'
              } else {
                len++
                col--
              }
            } else {
              res.push(['h', -len])
              len = 0
              dir = 'up'
            }
            break

          case 'down':
            filled[row][col-1] = 1
            if( isDark(row, col-1) ) {
              filled[row][col] = 1
              if( isDark(row, col) ) {
                res.push(['v', len])
                len = 0
                dir = 'right'
              } else {
                len++
                row++
              }
            } else {
              res.push(['v', len])
              len = 0
              dir = 'left'
            }
            break

          case 'up':
            filled[row-1][col] = 1
            if( isDark(row-1, col) ) {
              filled[row-1][col-1] = 1
              if( isDark(row-1, col-1) ) {
                res.push(['v', -len])
                len = 0
                dir = 'left'
              } else {
                len++
                row--
              }
            } else {
              res.push(['v', -len])
              len = 0
              dir = 'right'
            }
            break
        }
      } while( row != row0 || col != col0 )
      return res
    }
  } // matrix2path ends

  $.fn.qrcode = function(options){
    // if options is a string...
    if( typeof options === 'string' )
      options = { text: options }

    // set default values
    // typeNumber < 1 for automatic calculation
    options = $.extend({}, {
      width:        256,
      height:       256,
      render:       "svg",
      typeNumber:   -1,
      correctLevel: QRErrorCorrectLevel.H,
      foreground:   "#000",
      background:   "#FFF",
      border:       1
    }, options)

    var createSVG = function(){
      // generate the matrix
      var qrcode  = new QRCode(options.typeNumber, options.correctLevel)
      qrcode.addData(options.text)
      qrcode.make()

      var x = qrcode.moduleCount + options.border * 2

      var svg = '<?xml version="1.0" encoding="utf-8"?>'
      svg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="'+options.width+'" height="'+options.height+'" viewBox="0 0 '+x+' '+x+'" preserveAspectRatio="xMinYMin meet">'
      svg += '<rect width="100%" height="100%" fill="'+options.background+'" cx="0" cy="0" />'
      svg += '<path fill="'+options.foreground+'" d="'
      matrix2path(qrcode.modules).forEach(function(subpath) {
        var sp = ''
        for( var k = 0; k < subpath.length; k++ ) {
          var item = subpath[k]
          if( item[0] === 'M' )
            sp += 'M'+(item[1] + options.border)+' '+(item[2] + options.border)
          else
            sp += item.join('')
        }
        sp += 'z'
        svg += sp
      })
      svg += '"/></svg>'

      return svg
    }

    // based on code from Jon-Carlos Rivera (https://github.com/imbcmdth)
    var createCanvas = function(){
      // generate the matrix
      var qrcode  = new QRCode(options.typeNumber, options.correctLevel)
      qrcode.addData(options.text)
      qrcode.make()

      // create the canvas element
      var canvas    = document.createElement('canvas')
      $(canvas).css('background', options.background)
      canvas.width  = options.width
      canvas.height = options.height
      var ctx       = canvas.getContext('2d')
      ctx.fillStyle = options.foreground

      // compute tileW/tileH based on options.width/options.height
      var total = (qrcode.moduleCount + options.border * 2)
      var tileW = options.width  / total
      var tileH = options.height / total

      var w = Math.ceil(tileW)
      var h = Math.ceil(tileH)

      fill the canvas with dark rectangles
      for( var row = 0; row < qrcode.moduleCount; row++ ) {
        for( var col = 0; col < qrcode.moduleCount; col++ ) {
          if( qrcode.isDark(row, col) ) {
            var s_col = col + options.border,
                s_row = row + options.border

            ctx.fillRect(Math.round(s_col*tileW), Math.round(s_row*tileH), w, h)
          }
        }
      }

      // return the canvas code
      return canvas
    }

    var createTable = function(){
      // generate the matrix
      var qrcode  = new QRCode(options.typeNumber, options.correctLevel)
      qrcode.addData(options.text)
      qrcode.make()

      // create table element
      var $table = $('<table></table>')
            .css({
              "width":  options.width+"px",
              "height": options.height+"px",
              "border": 0,
              "border-collapse": "collapse",
              "background-color": options.background
            })

      var x = qrcode.moduleCount + options.border * 2
      var tileW = options.width  / x + 'px'
      var tileH = options.height / x + 'px'

      // top border line(s) ///////////////////
      for( var t = 0; t < options.border; t++ )
        $('<tr><td colspan="'+x+'"></td></tr>').css('height', tileH).css('background-color', options.background).appendTo($table)

      // draw the table
      for( var row = 0; row < qrcode.moduleCount; row++ )
      {
        var $row = $('<tr></tr>').css('height', tileH).appendTo($table)

        // left border module(s)
        for( var l = 0; l < options.border; l++ )
          $('<td></td>').css('width', tileW).css('background-color', options.background).appendTo($row)

        // modules
        for( var col = 0; col < qrcode.moduleCount; col++ )
        {
          $('<td></td>').css('width', tileW)
            .css('background-color', options[ (qrcode.isDark(row, col)) ? 'foreground' : 'background' ])
            .appendTo($row)
        }

        // right border module(s)
        for( var r = 0; r < options.border; r++ )
          $('<td></td>').css('width', tileW).css('background-color', options.background).appendTo($row)
      }

      // bottom border line(s) ////////////////
      for( var b = 0; b < options.border; b++ )
        $('<tr><td colspan="'+x+'"></td></tr>').css('height', tileH).css('background-color', options.background).appendTo($table)

      // return the table code
      return $table
    }

    // Returns an <img /> DOM element with a dataURI generated from createSVG
    var createImage = function() {
      return $('<img />').attr('src', 'data:image/svg+xml;base64,'+btoa(createSVG()))
    }

    return this.each(function(){
      switch( options.render ) {
        default:
        case 'svg':
          var element = createSVG()
          break

        case 'image':
          var element = createImage()
          break

        case 'canvas':
          var element = createCanvas()
          break

        case 'table':
          var element = createTable()
      }

      $(element).appendTo(this)
    })
  }
})( jQuery )


(function( $ ){
    $.fn.qrcode = function(options) {
        // if options is string,
        if( typeof options === 'string' ){
            options    = { text: options };
        }

        // set default values
        // typeNumber < 1 for automatic calculation
        options    = $.extend( {}, {
            render        : "canvas",
            width        : 256,
            height        : 256,
            typeNumber    : -1,
            correctLevel    : QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
        }, options);

        var createCanvas    = function(){
            // create the qrcode itself
            var qrcode    = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create canvas element
            var canvas    = document.createElement('canvas');
            canvas.width    = options.width;
            canvas.height    = options.height;
            var ctx        = canvas.getContext('2d');

            // compute tileW/tileH based on options.width/options.height
            var tileW    = options.width  / qrcode.getModuleCount();
            var tileH    = options.height / qrcode.getModuleCount();

            // draw in the canvas
            for( var row = 0; row < qrcode.getModuleCount(); row++ ){
                for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                    ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                    var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                    var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
                    ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);
                }
            }
            // return just built canvas
            return canvas;
        }

        // from Jon-Carlos Rivera (https://github.com/imbcmdth)
        var createTable    = function(){
            // create the qrcode itself
            var qrcode    = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create table element
            var $table    = $('<table></table>')
                .css("width", options.width+"px")
                .css("height", options.height+"px")
                .css("border", "0px")
                .css("border-collapse", "collapse")
                .css('background-color', options.background);

            // compute tileS percentage
            var tileW    = options.width / qrcode.getModuleCount();
            var tileH    = options.height / qrcode.getModuleCount();

            // draw in the table
            for(var row = 0; row < qrcode.getModuleCount(); row++ ){
                var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);

                for(var col = 0; col < qrcode.getModuleCount(); col++ ){
                    $('<td></td>')
                        .css('width', tileW+"px")
                        .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
                        .appendTo($row);
                }
            }
            // return just built canvas
            return $table;
        }

        var createDivs    = function(){
            // create the qrcode itself
            var qrcode    = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create container div element
            var $container    = $('<div></div>')
                .css("display", "block")
                .css("float", "none")
                .css("width", options.width+"px")
                .css("height", options.height+"px")
                .css("border", "0px")
                .css('background-color', options.background);

            // compute tileS percentage
            var modCount = qrcode.getModuleCount();
            var tileW    = options.width / modCount;
            var tileH    = options.height / modCount;

            // draw within the container div
            var first = true;
            for(var row = 0; row < modCount; row++ ){
                var firstCol = true;
                for(var col = 0; col < modCount; col++ ){
                    var $el = $('<div></div>')
                        .css("display", "block")
                        .css("float", "none")
                        .css('position', 'relative')
                        .css('height', tileH+"px")
                        .css('width', tileW+"px")
                        .css('top', -1*row*options.height+"px")
                        .css('left', row*tileW+"px")
                        .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
                        .appendTo($container);
                    first = false;
                    firstCol = false;
                }
            }
            // return just built div
            return $container
        }

        return this.each(function(){
            switch(options.render) {
                case "canvas":
                    var element = createCanvas();
                    break;
                case "divs":
                    var element = createDivs();
                    break;
                default:
                    var element = createTable();
                    break;
            }
            $(element).appendTo(this);
        });
    };
})( jQuery );

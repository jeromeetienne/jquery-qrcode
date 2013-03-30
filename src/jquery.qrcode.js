(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			margin		: 4,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var margin	= options.margin;
			var tileW	= options.width  / (qrcode.getModuleCount() + 2*options.margin);
			var tileH	= options.height / (qrcode.getModuleCount() + 2*options.margin);

			var isDark = function(x, y) {
				x -= margin; y -= margin;
				if(x < 0 || x >= qrcode.getModuleCount() || y < 0 || y >= qrcode.getModuleCount())
				    return false;
				else
				    return qrcode.isDark(x, y);
			}

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount()+2*margin; row++ ){
				for( var col = 0; col < qrcode.getModuleCount()+2*margin; col++ ){
					ctx.fillStyle = isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var margin	= options.margin;
			var tileW	= options.width / (qrcode.getModuleCount() + 2*margin);
			var tileH	= options.height / (qrcode.getModuleCount() + 2*margin);

			var isDark = function(x, y) {
				x -= margin; y -= margin;
				if(x < 0 || x >= qrcode.getModuleCount() || y < 0 || y >= qrcode.getModuleCount())
				    return false;
				else
				    return qrcode.isDark(x, y);
			}

			// draw in the table
			for(var row = 0; row < (qrcode.getModuleCount() + 2*margin); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < (qrcode.getModuleCount() + 2*margin); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			$(element).appendTo(this);
		});
	};
})( jQuery );

(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}
		
		if($(this).attr("data-render"))
			options	= $.extend( {}, { render : $(this).attr("data-render") }, options);
		if($(this).attr("data-size")) {
			var size = $(this).attr("data-size").split('x');
			options	= $.extend( {}, {
				width : size[0],
				height : size[1]
			}, options);
		}
		if($(this).attr('data-typeNumber'))
			options	= $.extend( {}, { render : $(this).attr("data-typeNumber") }, options);
		if($(this).attr('data-correctLevel'))
			options	= $.extend( {}, { render : $(this).attr("data-correctLevel") }, options);
		if($(this).attr('data-background'))
			options	= $.extend( {}, { render : $(this).attr("data-background") }, options);
		if($(this).attr('data-foreground'))
			options	= $.extend( {}, { render : $(this).attr("data-foreground") }, options);
		
		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: $(this).innerWidth(),
			height		: $(this).innerHeight(),
			typeNumber	: -1,
			correctLevel	: "H",
			background      : "#ffffff",
			foreground      : "#000000"
		}, options);

	
		// create the qrcode itself
		var qrcode	= new QRCode(options.typeNumber, QRErrorCorrectLevel[options.correctLevel]);
		qrcode.addData(options.text);
		qrcode.make();
			
		var createCanvas	= function(){
			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
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
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

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
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			$(element).appendTo(this);
		});
	};
})( jQuery );

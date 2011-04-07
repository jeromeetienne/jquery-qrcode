(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		options	= $.extend( {}, {
			width		: 256,
			height		: 256,
			typeNumber	: 4,
			correctLevel	: QRErrorCorrectLevel.H
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
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();
			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
					ctx.fillRect( col*tileW, row*tileH, tileW, tileH );  
				}	
			}
			// return just built canvas
			return canvas;
		}

		return this.each(function(){
			var canvas	= createCanvas();
			jQuery(canvas).appendTo(this);
		});
	};
})( jQuery );
(function( $ ){
	$.fn.qrcode = function(options) {

		var createCanvas	= function(text, typeNumber){
			var tileW	= 4;
			
			// create the qrcode itself
			var qrcode	= new QRCode(typeNumber, QRErrorCorrectLevel.H);
			qrcode.addData(text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= canvas.height	= qrcode.getModuleCount()*tileW;
			var ctx		= canvas.getContext('2d');
	
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
					ctx.fillRect( col*tileW, row*tileW, tileW, tileW );  
				}	
			}
			// return just built canvas
			return canvas;
		}

		return this.each(function(){
			var $this	= $(this);
			
			var canvas	= createCanvas("http://jetienne.com", 4);
			jQuery(canvas).appendTo($this);
		});
	};
})( jQuery );
(function( $ ){
	$.fn.qrcode = function(options) {
		// base number for auto padding
		var paddingBase = 4;
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",	// canvas, table, png
			width		: 256,
			height		: 256,
			padding		: "auto",	// numeric or auto ("auto" adds 4 cells for padding around each)
			typeNumber	: -1,
			correctLevel	: QRCode.CorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode.QRCodeModel(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var moduleCount = qrcode.getModuleCount();
			var tileW	= (options.padding == "auto") ? options.width / (moduleCount+paddingBase*2) : (options.width - options.padding*2)  / moduleCount;
			var tileH	= (options.padding == "auto") ? options.height / (moduleCount+paddingBase*2) : (options.height - options.padding*2) / moduleCount;

			// draw in the canvas
			// filling base
			ctx.fillStyle = options.background;
			ctx.fillRect(0,0,options.width,options.height);
			// start position
			var startLeft = (options.padding == "auto") ? Math.round(tileW*paddingBase) : options.padding;
			var startTop = (options.padding == "auto") ? Math.round(tileH*paddingBase) : options.padding;
			for( var row = 0; row < moduleCount; row++ ){
				for( var col = 0; col < moduleCount; col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					ctx.fillRect(Math.round(col*tileW)+startLeft,Math.round(row*tileH)+startTop, w, h);
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
			var moduleCount = qrcode.getModuleCount();
			var tileW	= (options.padding == "auto") ? options.width / (moduleCount+paddingBase*2) : (options.width - options.padding*2)  / moduleCount;
			var tileH	= (options.padding == "auto") ? options.height / (moduleCount+paddingBase*2) : (options.height - options.padding*2) / moduleCount;

			// draw in the table
			for(var row = 0; row < moduleCount; row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < moduleCount; col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}
				if(options.padding){
					var paddingWidth = (options.padding == "auto") ? tileW*paddingBase : options.padding;
					var paddingCell = $('<td></td>').css('width', paddingWidth+"px").css('background-color',options.background);
					$row.prepend(paddingCell).append(paddingCell);
				}
			}
			if(options.padding){
				var paddingRow = $('<tr></tr>').css('height', tileH+"px").append($('<td></td>').attr('colspan',moduleCount+2).css('background-color',options.background));
				$table.prepend(paddingRow).append(paddingRow);
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= (options.render == "canvas" || options.render == "png") ? createCanvas() : createTable();
			if(options.render == "png"){
				var png = element.toDataURL();
				$('<img>').attr('src',png).appendTo(this);
			} else {
				$(element).appendTo(this);
			}
			$(this).trigger('renderend');
		});
	};
})( jQuery );

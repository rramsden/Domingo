/**
 * Basic Font and Text tile set wrapper library.
 */
 
Domingo.Text = Domingo.Object2D.extend
({
	_image: null,
	_canvas: null,
	_context: null,
	_scalex: null,
	_scaley: null,
	_text: null,
	_color: null,
	_colors: {
		'white' : 0,
		'black' : 1,
		'red' : 2,
		'green' : 3
	},
	/**
	 * @param imgUrl {String} Path name to image text tilemap...
	 * @param text {String} ie. "Hello World"
	 */
	init : function(x, y, text, scalex, scaley, color) {		
		if(color == null){ color = "black"; }	
		this._text = text;
		var image = new Image();
		image.src = "resource/font.png";
		this._image = image;
		this._scalex = scalex;
		this._scaley = scaley;
		this._canvas = document.createElement("canvas");
		this._canvas.setAttribute('height', this._scalex );
		this._canvas.setAttribute('width', this._scaley*text.length);
		this._context = this._canvas.getContext("2d")
		this._super(x, y, 8*text.length, 8);
		this._color = color;
	},

	_writeText : function(text) {
		var keyMap = {};
		for(i = 31; i < (33+26); ++i) { keyMap[String.fromCharCode(97+(i-33))] = i; }		
		for(i = 0; i < text.length; ++i) {
			var slice_x = keyMap[text[i]]*8;
			var slice_y = this._colors[this._color]*8;
			var dx = i*this._scalex;
			var dy = 0;
			
			this._context.drawImage(this._image, slice_x, slice_y, 8, 8, dx, dy, this._scalex,this._scaley);
		}
	},
	
	update : function(layers) {
	},
	
	blit : function(buffer) {
		this._writeText(this._text);
		buffer.drawImage(this._canvas, 0, 15);
	}

});

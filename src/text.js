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
	_fontsize: null,
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
		var that = this;
		this._text = text;
	
		if(color == null){ color = "black"; }			

		this._image = Domingo.Resource.addImage("resource/font.png");	
		Domingo.Resource.addCallback("resource/font.png", function(img) { that._writeText() })
	
		this._scalex = scalex;
		this._scaley = scaley;
		
		this._canvas = document.createElement("canvas");
		this._canvas.setAttribute('height', this._scalex );
		this._canvas.setAttribute('width', this._scaley*text.length);
		this._context = this._canvas.getContext("2d")
		
		this._super(x, y, 8*text.length, 8);
		this._color = color;
	},

	_writeText : function() {
		var keyMap = {};
		for(i = 32; i < (32+90); ++i) { 
			keyMap[String.fromCharCode(i)] = i-32; 
			console.log(String.fromCharCode(i));
		}
		console.log(keyMap);		
		for(i = 0; i < this._text.length; ++i) {
			var slice_x = keyMap[this._text[i]]*8;
			var slice_y = this._colors[this._color]*8;
			var dx = i*this._scalex;
			var dy = 0;
			
		this._context.drawImage(this._image, slice_x, slice_y, 8, 8, dx, dy, this._scalex,this._scaley);
		}
	},
	
	update : function(layers) {
	},
	
	blit : function(buffer) {
		buffer.drawImage(this._canvas, this.x, this.y);
	}

});

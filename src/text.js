/**
 * Basic Font and Text tile set wrapper library.
 */
Domingo.Text = Domingo.Sprite.extend
({
	_text: null,
	_fontsize: null,
	_keyMap: {},
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
		this._super(x, y, scalex*text.length, scaley, "resource/font.png");
		this.setColor(color ? color : "black");			
		this._loadKeyMap();
		
		var that = this; Domingo.Resource.addCallback("resource/font.png", function(img) { that.setText(text) });
	
		this._scalex = scalex;
		this._scaley = scaley;
	},

	/**
 	 * Loads an ASCII table into a hash, used for finding letters in font image file.
 	 */
	_loadKeyMap : function() {
		for(var i = 32; i < (32+90); ++i) { this._keyMap[String.fromCharCode(i)] = i-32; }	
	},

	setColor : function(color) {
		this._color = color;
	},

<<<<<<< HEAD
	setText : function(text) {
		for(var i = 0; i < text.length; ++i) {
			var slice_x = this._keyMap[text[i]]*8;
=======
	/* 
 	* 	intetnal write text function
 	*/	
	_writeText : function() {
		var keyMap = {};
		for(i = 32; i < (32+90); ++i) { 
			keyMap[String.fromCharCode(i)] = i-32; 
		}	
		for(i = 0; i < this._text.length; ++i) {
			var slice_x = keyMap[this._text[i]]*8;
>>>>>>> 9320370bec1785479e668a4a8da7ed11bde8ef86
			var slice_y = this._colors[this._color]*8;
			var dx = i*this._scalex;
			var dy = 0;
			
			this._context.drawImage(this._image, slice_x, slice_y, 8, 8, dx, dy, this._scalex,this._scaley);
		}
	},

	blit : function(buffer) {
		buffer.drawImage(this._canvas, this.x, this.y);
	}
});

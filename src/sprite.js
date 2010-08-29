/**
 * Almost everything is a sprite. The Sprite class inherits from the Object class
 */
Domingo.Sprite = Domingo.Object2D.extend
({
	_image: null,

	// animation
	_frames: {},
	_currentFrame: 0,
	_frameWidth: 0,
	_frameHeight: 0,
	_frameTimer: 0,
	_frameName: null,
	_keepLooping: false,	
	
	_scalex: 0,
	_scaley: 0,
	_slicex: 0,
	_slicey: 0,
	_frameWidth: 0,
	_frameHeight: 0,

	/**
	 * Sprite constructor
	 *
	 * @param x {Integer} x-coord for location on screen
	 * @param y {Integer} y-coord for location on screen
	 * @param width {Integer} width of image
	 * @param height {Integer} height of image
	 * @param imgUrl {String} Image URL
	 */
	init : function(x, y, width, height, imgUrl) {
		this._super(x, y, width, height);
		this._image = Domingo.Resource.addImage(imgUrl);
		this._scalex = this._frameWidth = width;
		this._scaley = this._frameHeight = height;
	},

	/**
	 * @param path {String} Path to image file
	 */
	loadImage : function(path, width, height) {
	},
	
	/**
	 * Add animation takes a set of frames processed from the
	 * loaded sprite.
	 *
	 * addAnimation({
 	 *      :up     { frames: [1], framerate: 10 },
	 *      :down   { frames: [2], framerate: 10 },
	 *      :run    { frames: [3,4], framerate: 10}
	 * });
	 *
	 * @param data {Object} Javascript object containing frame information
	 */
	addAnimation : function(data) {
		this._frames = data;
	},

	/**
	 * Sets the current animation to be played
	 *
	 * @param name {String} Name of the animation
	 * @param loop {Boolean} Loop the animation
	 */
	play : function(name, loop) {
		this._keepLooping = loop;
		this._frameName = name;
		this.slicex = this._frameWidth*this._frames[name].frames[0];
		this.slicey = 0; // todo : support for frame animation rows
		// calculate sprite sheet offsets for blitting
		
		this._slicex = this._frameWidth*(this._frames[this._frameName].frames[this._currentFrame]-1);
		this._slicey = this._frameHeight*0; // todo : add row support for sprite sheets
	},

	flipx : function() {
	},

	flipy : function() {
	},

	fill : function() {
	},

	scale : function(width, height) {
	},

	alpha : function(level) {
	},

	color : function(value) {
	},
	
	setScale : function(x, y) {
		this._scalex = x;
		this._scaley = y;
	},
	
	updateAnimation : function() {
		if (this._frameTimer++ % this._frames[this._frameName].framerate == 0) {
	
			// calculate sprite sheet offsets for blitting
			this._slicex = this._frameWidth*(this._frames[this._frameName].frames[this._currentFrame]-1);
			this._slicey = this._frameHeight*0; // todo : add row support for sprite sheets
			
			// move to the next frame
			this._currentFrame = (this._currentFrame == this._frames[this._frameName].frames.length-1) ? 0 : this._currentFrame + 1;
		}
	},
	
	/**
	 * Epic collision detection! Not really just rectangular collision :(
	 * TODO : Quad-tree per-pixel collisions
	 */
	checkCollision : function(layers) {

		// collision detection
		for (var key in layers) {
			for(var i = 0; i < layers[key].length; ++i) {
				
				var obj = layers[key][i];
				if (obj.equals(this) || obj.x == null) { continue; }

				// calculate rect todo: isolate this into a function in object...
				var leftA = this.x;
				var rightA = this.x + this._scalex;
				var topA = this.y;
				var bottomA = this.y + this._scaley;
	
				var leftB = obj.x;
				var rightB = obj.x + obj._scalex;
				var topB = obj.y;
				var bottomB = obj.y + obj._scaley;
					
				console.log(bottomB)
					
				if( bottomA <= topB ) {}
				else if( topA >= bottomB ) {}
				else if( rightA <= leftB ) {}
				else if( leftA >= rightB ) {}
				else { return true; }
			}
		}
		
		return false;
	},

	/**
	 * Updates animation data, super method inherited from Object class
	 * controls physics of object.
	 */
	update : function(layers) {
		this.updateAnimation();
	},
	
	blit : function(buffer) {
		if (Domingo.Camera.checkBounds(this.x + this._scalex, this.y + this._scaley)) {
			var camera_x = Domingo.Camera.dx;
			var camera_y = Domingo.Camera.dy;
			buffer.drawImage(this._image, this._slicex, this._slicey, this._frameWidth, this._frameHeight, this.x - camera_x, this.y - camera_y, this._scalex, this._scaley)
		}
	}
});

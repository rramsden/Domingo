/**
 * Camera Object - contains control logic for camera
 */
Domingo.Camera = {
	dx: 0,
	dy: 0,
	_height: null,
	_width: null,
	_followObj: null,
	
	/**
	 * Creates a new camera with the width and height of the canvas
	 */
	setSize : function(width, height) {
		this._height = height;
		this._width = width;
	},
	
	/**
	 * Set the current object to follow with the camera
	 */
	follow : function(gameObj) {
		this._followObj = gameObj;
	},
	
	/**
	 * Checks to see if a coordinate is visible by the camera
	 */
	checkBounds : function(x, y) {
		if ( this.dx + this._width >= x && 
			 this.dx <= x &&
			 this.dy <= y &&
			 this.dy + this._height >= y ) 
			return true;
		else
			return false;
	},
	
	update : function() {
		var newx = this._followObj.x - Math.floor(this._width/2)
		var newy = this._followObj.y - Math.floor(this._height/2)
		
		// prevent camera from going out of bounds
		// todo: we need to know the level size for this!?
		if (newx < 0) newx = 0;
		if (newy < 0) newy = 0;
		
		this.dx = newx;
		this.dy = newy;
	}
};
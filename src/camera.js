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
		var newx = Math.max(this._followObj.x - Math.floor(this._width/2), 0)
		var newy = Math.max(this._followObj.y - Math.floor(this._height/2), 0)
		
		var max_dx = Domingo.map_w - Domingo.g_width;
		var max_dy = Domingo.map_h - Domingo.g_height;
		
		this.dx = Math.min(newx, 120) 
		this.dy = Math.min(newy, max_dy)
	}
};
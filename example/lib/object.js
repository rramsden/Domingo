/**
 * Container class for game objects, controls physics and motion. 
 */
Domingo.Object2D = Class.extend
({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	velocity: 0,
	acceleration: 0,

	init : function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
});

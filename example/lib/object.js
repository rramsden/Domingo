/**
 * Container class for game objects, controls physics and motion. 
 */
Domingo.Object2D = Class.extend
({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	solid: false,
	velocity: {x:5, y:5},
	acceleration: {x:0, y:0},

	initialize : function(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},
	
	update : function(layers) {

	}
});

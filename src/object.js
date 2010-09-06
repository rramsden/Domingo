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

	reset : function() {
		this.direction["up"] = 0;
		this.direction["left"] = 0;
		this.direction["right"] = 0;
		this.direction["down"]  = 0;
	},

	initialize : function(x, y, width, height) {
		this.direction = {
			"up" : 0,
			"left" : 0,
			"right" : 0,
			"down" : 0
		},
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},

	/**
	* Epic collision detection! Not really just rectangular collision :(
	* TODO : Quad-tree per-pixel collisions
	*/
	checkCollision : function(layers) {
		// collision detection
		for (var layer_key in layers) {
			for (var obj_key in layers[layer_key].objects) {
				var obj = layers[layer_key].objects[obj_key];
				
				if (obj == this || obj.x == null || obj.solid == false || this.solid == false) continue; 

				// calculate rect todo: replace with quadtree's
				var leftA = this.x;
				var rightA = this.x + this._scalex;
				var topA = this.y;
				var bottomA = this.y + this._scaley;

				var leftB = obj.x;
				var rightB = obj.x + obj._scalex;
				var topB = obj.y;
				var bottomB = obj.y + obj._scaley;
					
				if( bottomA <= topB) continue; 
				if( topA >= bottomB) continue;
				if( rightA <= leftB) continue; 
				if( leftA >= rightB) continue;
	
				// pop sprite back so we don't collide again
				if(this.direction["right"] == 1 || this.direction["left"] == 1) this.x += (obj.x - this.x < 0) ? (this.velocity.x) : (-this.velocity.x);
				if(this.direction["up"] == 1 || this.direction["down"] == 1) this.y += (obj.y - this.y < 0) ? (this.velocity.y) : (-this.velocity.y);
	
				return true; // collision detected
			}
		}
		
		return false;
	},
	
	update : function(layers) {
		this.checkCollision(layers);
	}
});

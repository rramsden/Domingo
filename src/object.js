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

	/**
	* Epic collision detection! Not really just rectangular collision :(
	* TODO : Quad-tree per-pixel collisions
	*/
	checkCollision : function(layers) {
		
		// collision detection
		for (var layer_key in this._layers) { 
			for (var obj_key in this._layers[layer_key].objects) {
				var obj = this._layers[layer_key].objects[obj_key];
				
				if (obj.equals(this) || obj.x == null || obj.solid == false && this.solid == false) continue; 

				// calculate rect todo: replace with quadtree's
				var leftA = this.x;
				var rightA = this.x + this._scalex;
				var topA = this.y;
				var bottomA = this.y + this._scaley;
	
				var leftB = obj.x;
				var rightB = obj.x + obj._scalex;
				var topB = obj.y;
				var bottomB = obj.y + obj._scaley;
					
				if( bottomA <= topB) return false;
				if( topA >= bottomB) return false;
				if( rightA <= leftB) return false;
				if( leftA >= rightB) return false; 
		
				return true; // collision detected
			}
		}
		
		return false;
	},
	
	update : function(layers) {

	}
});

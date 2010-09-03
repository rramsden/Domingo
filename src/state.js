/**
 * State module manages objects in a particular state ie. Menu State, Play State, etc 
 */
Domingo.State = Class.extend
({
	_layers: null, // Background, Player, HUD 

	/**
	 * State Constructor - intentionally left blank, except when inheriting 
	 */
	initialize : function() {
		this._layers = {};
	},
	
	createLayer : function(layerName) {
		this._layers[layerName] = new Domingo.Layer();
		return this._layers[layerName];
	},

	/**
	 * Garbage collection, clean up objects on state change
	 *
	 * @param group {Group} Name of group ie. Background, Player, Hud, Mobs
	 */
	remove : function(group) {
	},
	
	update : function() {
		for (var layer_key in this._layers) { 
			for (var obj_key in this._layers[layer_key].objects) {
				this._layers[layer_key].objects[obj_key].update();
			}
		}
	},

	blit : function(buffer) {
		for (var layer_key in this._layers) { 
			for (var obj_key in this._layers[layer_key].objects) {
				this._layers[layer_key].objects[obj_key].blit(buffer);
			}
		}
	}	
});

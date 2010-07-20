/**
 * State module manages objects in a particular state ie. Menu State, Play State, etc 
 */
Domingo.State = Class.extend
({
	_layers: {}, // Background, Player, HUD 

	/**
	 * State Constructor - intentionally left blank, except when inheriting 
	 */
	init : function() {
	},
	
	createLayer : function(layerName) {
		this._layers[layerName] = [];
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
		// update game objects
		for (var key in this._layers) {
			this._layers[key].forEach(function(gameObj) {
				gameObj.update(this._layers);
			})
		}
	},

	blit : function(buffer) {
		for (var key in this._layers) {
			this._layers[key].forEach(function(gameObj) {
				gameObj.blit(buffer);
			})
		}
	}	
});

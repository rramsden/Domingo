/**
 * State module manages objects in a particular state ie. Menu State, Play State, etc 
 */
var State = Class.extend
({
	layers: {}, // Background, Player, HUD 

	/**
	 * State Constructor - intentionally left blank, except when inheriting 
	 */
	init : function() {
	},

	/**
	 * This method stores a group of objects in the class
	 *
	 * @param name {String} Name of the layer, used for lookup
	 * @param layer {Layer} Background, player, hud
	 */
	addLayer : function(name, layer) {
		this.layers[name] = layer;
	},

	/**
	 * Garbage collection, clean up objects on state change
	 *
	 * @param group {Group} Name of group ie. Background, Player, Hud, Mobs
	 */
	remove : function(group) {
	},

	/**
 	 * Render layers
	 */
	render : function(canvas) {
		layers.forEach(function(layer) {
			layer.gameObjects.forEach(function(gameObj) {
				gameObj.render(canvas);	
			});
		});	
	}	
});

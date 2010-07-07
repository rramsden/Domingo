/**
 * Simple layer object. Layers are collections of objects. For example, Background, HUD, etc  
 */
var Layer = Class.extend
({
	gameObjects: {},

	init : function() {
	},

	add : function(name, gameObj) {
		this.gameObjects[name] = gameObj;
	}	
});

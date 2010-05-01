/**
 * Helper module contains serveral class methods for handling input, camera, sound, etc
 */
var Helper = {
	keyMap: {
		up: 38,
		down: 40,
		right: 39,
		left: 37
	},

	/**
	 * Helper method to create an HTML5 canvas element
	 */
	createCanvas : function(width, height, tagid) {
	},

	/**
	 * Adjust the camera to follow a game object
	 *
	 * @param gameObj {GameObject} Reference to a game object
	 */
	follow : function(gameObj) {
	},

	/**
	 * Stop tracking a game object
	 */
	unfollow : function() {
	},

	/**
	 * Play background music
	 *
	 * @param sound {String} Path to sound file
	 * @param volume {Integer} Volume level
	 */
	playMusic : function(sound, volume) {
	},

	/**
	 * Play background music
	 *
	 * @param sound {String} Path to sound file
	 * @param volume {Integer} Volume level
	 */
	playSound : function(sound, volume) {
	},

	keyIsPressed : function(key) {},
	keyJustPressed : function(key) {},
	keyJustReleased : function(key) {},
	
	onKeyUp : function() {},
	onKeyDown : function() {},
	onKeyPress : function() {},
	onMouseDown : function() {},
	onMouseOver : function() {},
	onMouseOut : function() {}
};

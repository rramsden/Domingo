/**
 * Helper module contains serveral class methods for handling input, camera, sound, etc
 */
Domingo.Global = {
	keyMap: {
		up: 38,
		down: 40,
		right: 39,
		left: 37
	},
	
	keyState: {},

	/**
	 * Helper method to create an HTML5 canvas element
	 */
	createCanvas : function(width, height, tagid) {
		document.getElementById("game").style.width = 320;
		document.getElementById("testme").style.width = 320;
		
		// todo : use a device config method
		if (navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) {
			width = 320;
			height = 480;
		}
		
		var canvas = document.createElement("canvas");
		canvas.setAttribute('height', height);
		canvas.setAttribute('width', width);
		document.getElementById(tagid).appendChild(canvas);
		return canvas;
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

	keyIsPressed : function(key) { return (this.keyState[this.keyMap[key]] == 1) },
	keyJustPressed : function(key) { return (this.keyState[this.keyMap[key]] == 2) },
	keyJustReleased : function(key) { return (this.keyState[this.keyMap[key]] == 3) },
	
	onKeyUp : function(e) { Domingo.Global.keyState[e.keyCode] = 3; },
	onKeyDown : function(e) { Domingo.Global.keyState[e.keyCode] = 2; },
	onKeyPress : function(e) { Domingo.Global.keyState[e.keyCode] = 1; },
	onMouseDown : function() { },
	onMouseOver : function() { },
	onMouseOut : function() { }
};

/**
 * The Core module contains the game loop and references to states and
 * game objects.
 */
var Game = Class.extend
({
	canvas_width: 0,
	canvas_height: 0,
	canvas: null,

	framerate: 25,
	
	state: null,

	/**
	 * Game Constructor - Initializes the game, sets up canvas, state, etc
	 *
	 * @param width {Integer} Width of canvas
	 * @param height {Integer} Height of canvas
	 * @param state {String} State to start in ie. MenuState
	 * @param tagid {String} ID of HTML tag to embed canvas
	 */
	init : function(width, height, state, tagid) {
		this.canvas_width = width;
		this.canvas_height = height;
		this.changeState(state);
		Helper.createCanvas(width, height, tagid);

		// add keyboard listeners
		window.addEventListener('keyup', Helper.onKeyUp, false);
		window.addEventListener('keydown', Helper.onKeyDown, false);
		window.addEventListener('keypress', Helper.onKeyPress, false);
	},

	/**
	 * Changes the current state, does some cleanup work and
	 * initializes the new state object.
	 *
	 * @param state {State} 
	 */
	changeState : function(state) {
		// todo : garbage collection
		this.state = new state;
	},

	/**
	 * Game loop, controls everything!
	 */
	loop : function() {
	}
});

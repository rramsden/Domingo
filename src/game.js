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
	
	current_state: '',
	states: {},

	/**
	 * Game Constructor - creates HTML5 canvas
	 *
	 * @param width {Integer} Width of canvas
	 * @param height {Integer} Height of canvas
	 * @param tagid {String} ID of HTML tag to embed canvas
	 */
	init : function(width, height, tagid) {
		this.canvas_width = width;
		this.canvas_height = height;
		
	},

	/**
	 * Game loop, controls everything!
	 */
	loop : function() {
	}
});

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
	iterator: 0,

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
		
		this.canvas = Helper.createCanvas(width, height, tagid);

		// add keyboard listeners
		window.addEventListener('keyup', Helper.onKeyUp, false);
		window.addEventListener('keydown', Helper.onKeyDown, false);
		window.addEventListener('keypress', Helper.onKeyPress, false);
		
		var that = this;
		setInterval(function() { that.loop(that) }, 60);
	},

	/**
	 * Changes the current state, does some cleanup work and
	 * initializes the new state object.
	 *
	 * @param state {State} State object 
	 */
	changeState : function(state) {
		// todo : garbage collection
		this.state = new state;
	},

	/**
	 * Game loop, controls everything!
	 */
	loop : function(that) {
		that.iterator = (that.iterator + 1) % 360;
		
		var r = 50
		var x2 = r * Math.cos(that.iterator) + 50
		var y2 = r * Math.sin(that.iterator) + 50
		
		var context = that.canvas.getContext("2d");
		context.fillStyle = "rgb(220,220,220)"
		context.fillRect(x2,y2,5, 5);
	}
});

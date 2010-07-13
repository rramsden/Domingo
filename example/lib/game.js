/**
 * The Core module contains the game loop and references to states and
 * game objects.
 */
Domingo.Game = Class.extend
({
	width: 0,
	height: 0,
	canvas: null,
	context: null,
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
		this.width = width;
		this.height = height;
		this.state = new state();
		
		this.canvas = Domingo.Global.createCanvas(width, height, tagid);
		this.context = this.canvas.getContext('2d');

		// add keyboard listeners
		window.addEventListener('keyup', Domingo.Global.onKeyUp, false);
		window.addEventListener('keydown', Domingo.Global.onKeyDown, false);
		window.addEventListener('keypress', Domingo.Global.onKeyPress, false);
	},
	
	clear : function() {
		this.context.clearRect(0,0,this.width,this.height);
	},
	
	loop : function() {
		this.clear();
		this.state.update();
		this.state.blit(this.context);
	}
	
});

/**
 * The Core module contains the game loop and references to states and
 * game objects.
 */
Domingo.Game = Class.extend
({
	_width: 0,
	_height: 0,
	_canvas: null,
	_context2D: null,
	_context: null,
	_framerate: 25,
	_frameStart: new Date().getTime(),
	_state: null,

	/**
	 * Game Constructor - Initializes the game, sets up canvas, state, etc
	 *
	 * @param width {Integer} Width of canvas
	 * @param height {Integer} Height of canvas
	 * @param tagid {String} ID of HTML tag to embed canvas
	 */
	init : function(width, height, tagid) {
		this._width = width;
		this._height = height;
		
		if (navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) {
			this._width = 320;
			this._height = 240;
		}
		
		this._canvas = Domingo.createCanvas("display", this._width, this._height)
		this._context2D = this._canvas.getContext('2d');
		document.getElementById(tagid).appendChild(this._canvas);
		
		Domingo.Camera.setSize(this._width, this._height)

		// add keyboard listeners
		window.addEventListener('keyup', Domingo.onKeyUp, false);
		window.addEventListener('keydown', Domingo.onKeyDown, false);
	},
	
	/**
	 * loadState accepts an inherited State class. 
	 *
	 * @param state {Class} Uninitialized Class extended from State
	 */
	loadState : function(state) {
		this._state = new state();
		
		var that = this;
		Domingo.Resource.load();
		
		function loading() {
			if (Domingo.Resource.isReady()) {
				// start the game loop if resources are loaded
				setInterval( function() { that.loop() }, 40 )
			} else {
				Domingo.Resource.blit(that._context2D)
				setTimeout( loading, 40 )
			}
		}
		
		setTimeout( loading, 40 )
	},
	
	loop : function() {
		
		var start = new Date().getTime();
		this._state.update();
		Domingo.Camera.update();
		this._state.blit(this._context2D);
		
		// render backbuffer to front
		//	this.context2D.drawImage(this.backBuffer, 0, 0);
		//  console.log(new Date().getTime() - start)
	}
	
});
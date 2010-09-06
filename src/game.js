/**
 * The Core module contains the game loop and references to states and
 * game objects.
 */
Domingo.Game = Class.extend
({
	_canvas: null,
	_context2D: null,
	_context: null,
	_backBuffer: null,
	_backBuffer2D: null,
	_framerate: 25,
	_state: null,
	_gameClock: null,

	/**
	 * Game Constructor - Initializes the game, sets up canvas, state, etc
	 *
	 * @param width {Integer} Width of canvas
	 * @param height {Integer} Height of canvas
	 * @param tagid {String} ID of HTML tag to embed canvas
	 */
	initialize : function(width, height, tagid) {
		// throw some useful constants into the global namespace
		Domingo.g_width = width;
		Domingo.g_height = height;
		Domingo.w_width = width;
		Domingo.w_height = height;
		
		Domingo.Camera.setSize(width, height);
		
		// adjust window width and height for mobile devices
		if (navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) {
			Domingo.w_width = 320;
			Domingo.w_height = 240;
		}

		Domingo.Network.init(10081);

		// add keyboard listeners
		window.addEventListener('keyup', Domingo.onKeyUp, false);
		window.addEventListener('keydown', Domingo.onKeyDown, false);
		
		this._canvas = Domingo.createCanvas("display", Domingo.w_width, Domingo.w_height);
		this._context2D = this._canvas.getContext('2d');
		document.getElementById(tagid).appendChild(this._canvas);
	},
	
	/**
	 * loadState accepts an inherited State class. 
	 *
	 * @param state {Class} Uninitialized Class extended from State
	 */
	loadState : function(state) {
		clearInterval(this._gameClock);
		this._state = new state();
		var self = this
		
		Domingo.Resource.load();
		
		function loading() {
			if (Domingo.Resource.isReady()) {
				// start the game loop if resources are loaded
				self._gameClock = setInterval( function() { self.loop() }, 40 )
			} else {
				Domingo.Resource.blit(self._context2D)
				setTimeout( loading, 40 )
			}
		}
		
		setTimeout( loading, 40 )
	},
	
	loop : function() {
		var start = new Date().getTime();
		
		this._state.update();
		Domingo.Camera.update();
		Domingo.Audio.update();
		Domingo.updateController();
		this._state.blit(this._context2D);

		//console.log(new Date().getTime() - start)
	}
	
});

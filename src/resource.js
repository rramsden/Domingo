/**
 * When you add images and sound in Domingo the resource manager handles it.
 * If a resource has already been loaded it will be cached between state changes unless
 * otherwise specified. 
 */
Domingo.Resource = {
	_images: {},
	_sounds: {},
	_resourceCount: 0,
	_loadCount: 0,
	_callbacks: {}, /* custom callbacks that trigger when a resource loads */
	_laodedResource: null, /* sets the name of recently loaded image */
	
	/**
	 * Make sure you pick a cross-compatible audio format. Keep in mind
	 * that MP3's are not supported under Firefox due to liscensing issues.
	 * Your best bet is to have all audio in .ogg format! Check out Audacity 
	 * for converting mp3 to ogg
	 *
	 * @param {String} Path to image
	 */
	addSound : function( path ) {
		// check if sound is already cached
		if (this._sounds[path]) {
			return this._sounds[path];
		} else{
			var sound = new Audio()
			this._sounds[path] = sound;
			++this._resourceCount;
			return this._sounds[path];
		}
		
	},
	
	/**
	 * @param {String} Path to image
	 */
	addImage : function( path ) { 
		// check if image is already cached
		if (this._images[path]) {
			return this._images[path];
		} else {
			var image = new Image();
			this._images[path] = image;
			++this._resourceCount;
			return this._images[path];
		}
	},

	/**
	 * You can specify custom callback methods when a resource 
	 * loads. For example,
	 * 		var fun = function(img) { 
	 *			console.log("my image loaded, it has a height of " + img.height) 
	 *		}
	 */
	addCallback : function( name, callback ) {
		if (this._callbacks[name]) this._callbacks[name].push(callback);
		else this._callbacks[name] = [callback];
	},
	
	/**
 	 * Can load three types of resources images, sounds, and templates.
 	 * 
 	 * @param {Assoc Array} (images, sounds, templtes)
 	 */
	_loadResource : function(resources) {
		for (var path in resources) {
			resources[path].onload = (function(path, that) { 
				return function() {
					Domingo.Log.info("Loading Resource: " + path);
					// check if resource has a callback
					if (that._callbacks[path]) {
						for (var i = 0; i < that._callbacks[path].length; ++i) {
							console.log("executing callback for " + path);
							that._callbacks[path][i](this);
						}
					}

					++that._loadCount;
					that._laodedResource = path; // used for loading screen
				}
			})(path, this);

			if (resources[path] instanceof Audio || resources[path] instanceof Image) resources[path].src = path;
			else resources[path].load();

			// Unfortunately Audio doesn't have a callback for onload ...
			// or perhaps it does?
			if (resources[path] instanceof Audio) {
				resources[path].onload();
			}
		}
	},
	
	isReady : function() {
		return (this._loadCount == this._resourceCount) ? true : false
	},
	
	load : function() {
		this._loadResource(this._images);
		this._loadResource(this._sounds);
	},
	
	/**
	 * Draws a basic loading screen on a canvas
	 */
	blit : function(buffer) {
	//	console.log("loaded " + this._loadCount + " of " + this._resourceCount)
	}
}

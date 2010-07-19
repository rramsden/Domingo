Domingo.Resource = {
	_images: {},
	_resourceCount: 0,
	_loadCount: 0,
	_callbacks: {}, /* custom callbacks for when a resource loads */
	_laodedImage: null, /* set to name of just loaded image */
	
	addImage : function( path ) { 
		// check if the resource already exists in cache
		if (this._images[path]) {
			return this._images[path];
		} else {
			var image = new Image();
			this._images[path] = image;
			++this._resourceCount;
			return this._images[path];
		}
	},
	
	addImageCallback : function( name, callback ) {
		this._callbacks[name] = callback;
	},
	
	loadImages : function() {
		var that = this; 
		for (var imgPath in this._images) {
			this._images[imgPath].src = imgPath;
			this._images[imgPath].onload = function() {
				// check if image has any custom defined callbacks
				if (that._callbacks[imgPath]) {
					that._callbacks[imgPath](this);
				}
				
				// update counter and store the image path name for loading screen
				++that._loadCount;
				that._loadedImage = imgPath;	
			}
		}
	},
	
	isReady : function() {
		return (this._loadCount == this._resourceCount) ? true : false
	},
	
	load : function() {
		this.loadImages();
	},
	
	/**
	 * Draws a basic loading screen on a canvas
	 */
	blit : function(buffer) {
		console.log("loaded " + this._loadCount + " of " + this._resourceCount)
	}
}
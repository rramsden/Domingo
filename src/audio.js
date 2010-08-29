Domingo.Audio = {
	_sounds : {},
	_maxsounds : null,
	_currentsong : null,
	_volume : 1,

	/*@param path {String} path to the audio file...
 	*/ 
	loadSound : function(path) {
		this._sounds[path] = Domingo.Resource.addSound(path);					
	}, 

	/*@param path {String} path to the audio file...
 	* @param loop {boolean} decides if the sound has a loop
 	* @param volume {float} adjusts the volume 1 for max 0 for off
 	*/
	play : function(path, loop, volume) {
		this._sounds[path].loop = ((loop == true) ? loop : false);
		this._sounds[path].play();
		this._currentsong = path;
		this._volume = (volume ? volume : 1);
		this._sounds[path].volume = this._volume;
	},

	/*@param scale {String} Up adjusts the volume up Down ajusts it down*/
	volume : function(scale) {
		
		var scalet = 0.1;	
		if( scale == "up" && this._sounds[this._currentsong].volume.toFixed(1) < 1 ){
			 this._sounds[this._currentsong].volume = 
				(this._sounds[this._currentsong].volume + scalet).toFixed(1);
			 		}
		if( scale == "down" && this._sounds[this._currentsong].volume.toFixed(1) > 0) { 
			 this._sounds[this._currentsong].volume = 
				(this._sounds[this._currentsong].volume - scalet).toFixed(1);
		} 
		this._volume = this._sounds[this._currentsong].volume;
	}

};


Domingo.Audio = {
	_sounds : {},
	_maxsounds : null,
	_currentsong : null,
	_volume : 1,
	loadSound : function(path) {
		this._sounds[path] = Domingo.Resource.addSound(path);					
	}, 

	play : function(path, loop) {
		this._sounds[path].loop = ((loop == true) ? loop : false);
		this._sounds[path].play();
		this._currentsong = path;
		this._volume = 1;
		this._sounds[path].volume = this._volume;
	},
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

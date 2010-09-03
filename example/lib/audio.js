Domingo.Audio = {
	_sounds : {},
	_maxsounds : null,
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

	update : function() {
		if (Domingo.keyIsPressed("-")) {
			Domingo.Audio.volume("down");
		}
		if (Domingo.keyIsPressed("+")) {
			Domingo.Audio.volume("up");
		}
	},

	/*@param scale {String} Up adjusts the volume up Down ajusts it down*/
	volume : function(scale) {	
		var scalet = 0.1;

		for (var key in this._sounds) {
			var sound = this._sounds[key];	
			if( scale == "up" && sound.volume.toFixed(1) < 1 ){
				sound.volume = (sound.volume + scalet).toFixed(1);
			}
			if( scale == "down" && sound.volume.toFixed(1) > 0) { 
			 	sound.volume = (sound.volume - scalet).toFixed(1);
			} 
			this._volume = sound.volume;
		}
	}

};

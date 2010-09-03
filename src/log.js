Domingo.Log = {
	debug : function(msg) {
		if (Domingo.LOGLEVEL == "debug" || Domingo.LOGEVERL == "all") console.log(msg);
	},

	info : function(msg) {
		if (Domingo.LOGLEVEL == "info" || Domingo.LOGEVEL == "all") console.log(msg);
	},

	warning: function(msg) {
		if (Domingo.LOGLEVEL == "warning" || Domingo.LOGLEVEL == "all") console.log(msg);
	}
}; 

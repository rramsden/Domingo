Domingo.Log = {
	debug : function(msg) {
		if (Domingo.LOGLEVEL == "debug" || Domingo.LOGLEVEL == "all") console.log(msg);
	},

	info : function(msg) {
		if (Domingo.LOGLEVEL == "info" || Domingo.LOGLEVEL == "all") console.log(msg);
	},

	warning: function(msg) {
		if (Domingo.LOGLEVEL == "warning" || Domingo.LOGLEVEL == "all") console.log(msg);
	}
}; 

Domingo.Layer = Class.extend
({
	objects : null,

	initialize : function() {
		this.objects = {};
	},

	push : function(obj, name) {
		if (name) { 
			this.objects[name] = obj; 
		}
		else {
			this.objects[this._guid()] = obj;
		}
	},

	get : function(name) {
		return this.objects[name];
	},

	remove : function(name) {
		delete this.objects[name];
	},

	_guid : function() {
   		var S4 = function() { return (((1+Math.random())*0x10000)|0).toString(16).substring(1); }
   		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}
});

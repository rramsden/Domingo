Domingo.GUI.Widget = Class.extend
({
	x: 0,
	y: 0,
	width: 0,
	height: 0,

	html: null,

	initialize : function(x, y, src) {
		var self = this;
		
		//this.html = eval(src.split('/').join('_') + "_html")();
	},

	load : function() {
	},

	onload : function(data) {
		this.html = data;
	},

	show : function(anim) {
		$j(Domingo.Game.tagid).show(anim);
	},

	hide : function(anim) {
		$j(Domingo.Game.tagid).hide(anim);
	},

	fadeIn : function() {
		$j(Domingo.Game.tagid).fadeIn();
	},

	fadeOut : function() {
		$j(Domingo.Game.tagid).fadeOut();
	}
});

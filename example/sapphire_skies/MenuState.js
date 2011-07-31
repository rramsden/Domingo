include("PlayState.js");

var MenuState = Class.extend(Domingo.State, {
	initialize : function() {
		var self = this;
		this.parent();

		var Logo = new Widget(0, 0, "logo.html");	
		var Login = new Widget(0, 200, "login_box.html");
		var InvalidLogin = new Widget(0, 0, "invalid_login.html");

		Login.addListener("submit", function(data) {
			Domingo.Network.send(["login", data.username, sha1Hash(data.password)]);
		});

		PopupError.addListener("click", function(data) {
			PopupError.hide("slow");
		});

		Logo.show();
		Login.show("slow");

		Domingo.Network.callback("login", function(data) {
			if (data.auth == "ok") {
				Login.hide("slow");
				Domingo.Game.loadState(PlayState);
			} else {
				InvalidLogin.show();
			}
		}); 
	}
});

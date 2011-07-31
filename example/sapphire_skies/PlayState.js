include("Player.js");

var PlayState = Class.extend(Domingo.State, {
	initialize : function() {
		this.parent();

		var mapData = [
			[12,12,12,12,12,12,12,12,12,13,54,54],
			[12,12,12,12,12,12,12,12,12,13,54,54],
			[12,12,12,12,12,12,22,24,12,13,54,54],
			[12,12,12,14,12,12,36,38,12,13,54,54],
			[12,12,1 ,9 ,3 ,12,12,12,12,13,54,54],
			[12,35,9 ,9 ,9 ,42,12,12,12,13,54,54],
			[12,12,15,9 ,17,12,14,12,12,13,54,54],
			[12,12,12,21,12,12,7 ,12,12,13,54,54],
			[12,12,12,12,12,12,7 ,12,12,13,54,54],
			[12,12,12,12,12,12,15,28,28,28,54,54],
			[12,12,12,12,12,12,12,12,12,13,54,54],
			[19,19,19,19,19,19,19,19,19,20,54,54],
			[54,54,54,54,54,54,54,54,54,54,54,54],
			[54,54,54,54,54,54,54,54,54,54,54,54]
		];
		var map = new Domingo.TileMap("resource/tileset.png", 32, 32, mapData);
		map.setTileScale(64, 64);
		
		var font = new Domingo.Text(120, 2, "Domingo HTML5 engine",10,10,"white");
		
		var bglayer = this.createLayer("background")
		var sprites = this.createLayer("sprites")
		var hud = this.createLayer("hud")
		var player = new Player(0, 0);
	
		var TestWidget = new Domingo.GUI.Widget(0, 0, "login_box");
		TestWidget.show("slow");

		bglayer.push(map)
		hud.push(font);

		Domingo.Network.callback("connect", function(data) {
			Domingo.Camera.follow(player);
			Domingo.Controller = player;
			sprites.push(player);
		});

		Domingo.Network.callback("join", function(data) {
			var player = new Player(data.x, data.y);
			sprites.push(player, "player_" + data.id);
		});

		Domingo.Network.callback("move", function(data) {
			var player = sprites.get("player_" + data.id);
			player.x = data.x;
			player.y = data.y;
			player.direction[data.direction] = 1;
		});

		Domingo.Network.callback("disconnect", function(data) {
			sprites.remove("player_" + data.id);
		});

		//Domingo.Audio.loadSound("resource/shining2_town.ogg");
		//Domingo.Audio.play("resource/shining2_town.ogg",true, 0.1);
	}
});

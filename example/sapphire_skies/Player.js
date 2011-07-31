var Player = Class.extend(Domingo.Sprite, {
	initialize : function(x, y) {
		this.parent(x, y, 25, 25, "resource/character.png");
		this.setScale(64,64);
		this.solid = true;
		
		this.addAnimation({
			up:    { frames: [3,4], framerate: 10 },
			down:  { frames: [1,2], framerate: 10 },
			left:  { frames: [5,6], framerate: 10 },
			right: { frames: [7,8], framerate: 10 },
			die:   { frames: [9], framerate: 10 }
		});
		
		this.play("down")
	},
	
	update : function(layers) {
		if (this.direction["up"] == 1) {
			this.play("up")
			this.y -= this.velocity.y;
		}
		if (this.direction["left"] == 1) {
			this.play("left")
			this.x -= this.velocity.x;
		}
		if (this.direction["right"] == 1) {
			this.play("right")
			this.x += this.velocity.x;
		}
		if (this.direction["down"] == 1) {
			this.play("down")
			this.y += this.velocity.y;
		}
		this.parent(layers);
		this.reset();			
	}
});

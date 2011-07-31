(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Domingo.Sprite = (function() {
    __extends(Sprite, Domingo.BasicObject);
    function Sprite() {
      Sprite.__super__.constructor.apply(this, arguments);
    }
    Sprite.prototype.initialize = function(x, y, width, height, imgUrl) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.imgUrl = imgUrl;
      this.frames = {};
      this.image = Domingo.Resource.addImage(imgUrl);
      this.scalex = this.frameWidth = this.width;
      this.scaley = this.frameHeight = this.height;
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute('height', height);
      this.canvas.setAttribute('width', width);
      return this.context = this.canvas.getContext("2d");
    };
    Sprite.prototype.loadImage = function(path, width, height) {};
    Sprite.prototype.addAnimation = function(data) {
      return this.frames = data;
    };
    Sprite.prototype.play = function(frameName, keepLooping) {
      this.frameName = frameName;
      this.keepLooping = keepLooping;
      this.animated = true;
      this.slicex = this.frameWidth * this.frames[this.frameName].frames[0];
      this.slicey = 0;
      this.slicex = this.frameWidth * (this.frames[this.frameName].frames[this.currentFrame] - 1);
      return this.slicey = this.frameHeight * 0;
    };
    Sprite.prototype.flipx = function() {};
    Sprite.prototype.flipy = function() {};
    Sprite.prototype.fill = function() {};
    Sprite.prototype.scale = function(width, height) {};
    Sprite.prototype.alpha = function(level) {};
    Sprite.prototype.color = function(r, g, b) {};
    Sprite.prototype.animate = function() {};
    Sprite.prototype.setScale = function(scalex, scaley) {
      this.scalex = scalex;
      this.scaley = scaley;
    };
    Sprite.prototype.update = function(layers) {
      Sprite.__super__.update.call(this, layers);
      if (this.animated != null) {
        return this.updateAnimation();
      }
    };
    Sprite.prototype.blit = function(buffer) {
      var camera_x, camera_y;
      if (Domingo.camera.checkBounds(this.x + this.scalex, this.y + this.scaley)) {
        camera_x = Domingo.camera.dx;
        camera_y = Domingo.camera.dy;
        return buffer.drawImage(this.image, this.slicex, this.slicey, this.frameWidth, this.frameHeight, this.x - camera_x, this.y - camera_y, this.scalex, this.scaley);
      }
    };
    return Sprite;
  })();
}).call(this);

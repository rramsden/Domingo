var Domingo = Domingo || {};
(function() {
  Domingo.BasicObject = (function() {
    function BasicObject() {
      this.uid = Domingo.BasicObject.guid();
      this.width = 0;
      this.height = 0;
      this.solid = false;
      this.velocity = {
        x: 0,
        y: 0
      };
      this.acceleration = {
        x: 0,
        y: 0
      };
    }
    BasicObject.prototype.collide = function(layers) {
      return null;
    };
    BasicObject.guid = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    return BasicObject;
  })();
}).call(this);
(function() {
  Domingo.Camera = (function() {
    function Camera(width, height) {
      this.width = width;
      this.height = height;
      this.dx = 0;
      this.dy = 0;
    }
    Camera.prototype.follow = function(object) {
      var _base;
      if (!(typeof (_base = this.following).instanceOf === "function" ? _base.instanceOf(Domingo.Object2D) : void 0)) {
        throw Error('you can only follow instances of BasicObject');
      }
      return this.following = object;
    };
    Camera.prototype.checkBounds = function(x, y) {
      if (this.dx + this.width >= x && this.dx <= x && this.dy <= y && this.dy + this.height >= y) {
        return true;
      }
      return false;
    };
    Camera.prototype.update = function() {
      var max_dx, max_dy, newx, newy;
      if (this.following != null) {
        newx = Math.max(this.following.x - Math.floor(this.width / 2), 0);
        newy = Math.max(this.following.y - Math.floor(this.height / 2), 0);
        max_dx = Domingo.map_w - Domingo.g_width;
        max_dy = Domingo.map_h - Domingo.g_height;
        this.dx = Math.min(newx, 120);
        return this.dy = Math.min(newy, max_dy);
      }
    };
    return Camera;
  })();
}).call(this);
(function() {
  Domingo.controllers = [];
  Domingo.keyState = {};
  Domingo.keyMap = {
    up: [38],
    down: [40],
    right: [39],
    left: [37],
    w: [87],
    d: [68],
    s: [83],
    a: [65],
    '-': [189, 109],
    '+': [187, 61]
  };
  Domingo.keyIsPressed = function(key) {
    var i, _ref;
    if (Domingo.keyMap[key]) {
      for (i = 0, _ref = Domingo.keyMap[key].length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (Domingo.keyState[domingo.keyMap[key][i]] === 1) {
          return true;
        }
      }
    }
  };
  Domingo.keyJustReleased = function(key) {
    var i, _ref;
    if (Domingo.keyMap[key]) {
      for (i = 0, _ref = Domingo.keyMap[key].length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (Domingo.keyState[domingo.keyMap[key][i]] === 2) {
          return true;
        }
      }
    }
  };
  Domingo.onKeyUp = function(e) {
    return domingo.keyState[e.keyCode] = 2;
  };
  Domingo.onKeyDown = function(e) {
    return domingo.keyState[e.keyCode] = 1;
  };
  Domingo.onMouseDown = function(e) {
    return {};
  };
  Domingo.onMouseOver = function(e) {
    return {};
  };
  Domingo.onMouseOut = function(e) {
    return {};
  };
  Domingo.addController = function(controller) {
    return Domingo.controllers.push(controller);
  };
  Domingo.updateController = function() {
    var callback, controller, key, _i, _len, _ref, _results;
    _ref = Domingo.controllers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      controller = _ref[_i];
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (key in controller) {
          callback = controller[key];
          _results2.push(Domingo.keyIsPressed(key) ? callback() : void 0);
        }
        return _results2;
      })());
    }
    return _results;
  };
}).call(this);
(function() {
  Domingo.Game = (function() {
    function Game(width, height, tagid) {
      this.width = width;
      this.height = height;
      Domingo.camera = new Domingo.Camera(this.width, this.height);
      window.addEventListener('keyup', Domingo.onKeyUp, false);
      window.addEventListener('keydown', Domingo.onKeyDown, false);
      this.canvas = Domingo.createCanvas("display", this.width, this.height);
      this.context2D = this.canvas.getContext('2d');
      document.getElementById(tagid).appendChild(this.canvas);
    }
    Game.prototype.loadState = function(state) {
      this.state = state;
      if (!this.state.instanceOf(Domingo.State)) {
        throw Error('parameter must be an instance of State');
      }
      return this.state = new state();
    };
    Game.prototype.loop = function() {
      return this.state.update();
    };
    return Game;
  })();
}).call(this);
(function() {
  Domingo.Layer = (function() {
    function Layer(name) {
      this.name = name;
      this.objects = {};
    }
    Layer.prototype.push = function(object) {
      return this.objects[object.uid] = object;
    };
    Layer.prototype.get = function(key) {
      return this.objects[key];
    };
    Layer.prototype.remove = function(key) {
      this.objects[key].destroy();
      return delete this.objects[key];
    };
    Layer.prototype.destroy = function() {
      var object;
      for (object in this.objects) {
        object.destroy();
      }
      return this.objects = null;
    };
    return Layer;
  })();
}).call(this);
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
(function() {
  Domingo.State = (function() {
    function State() {}
    State.prototype.constrcutor = function() {
      return this.layers = {};
    };
    State.prototype.create_layer = function(key) {
      return this.layers[key] = new Domingo.Layer(key);
    };
    State.prototype.update = function() {
      var key, layer, obj, _ref, _results;
      _ref = this.layers;
      _results = [];
      for (key in _ref) {
        layer = _ref[key];
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (obj in layer.objects) {
            _results2.push(obj.update(this.layers));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    State.prototype.blit = function(buffer) {
      var key, layer, obj, _ref, _results;
      _ref = this.layers;
      _results = [];
      for (key in _ref) {
        layer = _ref[key];
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (obj in layer.objects) {
            _results2.push(obj.blit(buffer));
          }
          return _results2;
        })());
      }
      return _results;
    };
    return State;
  })();
}).call(this);
(function() {
  Domingo.TileMap = (function() {
    function TileMap() {}
    TileMap.prototype.load = function(image) {};
    TileMap.prototype.checkCollision = function(object) {};
    TileMap.prototype.update = function(layers) {};
    TileMap.prototype.setTileScale = function(scalex, scaley) {
      this.scalex = scalex;
      this.scaley = scaley;
    };
    TileMap.prototype.blit = function(buffer) {};
    return TileMap;
  })();
}).call(this);
(function() {

}).call(this);
(function() {
  var PlayState;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PlayState = (function() {
    __extends(PlayState, Domingo.State);
    function PlayState() {}
    return PlayState;
  })();
}).call(this);
(function() {
  Domingo.Game = new Domingo.Game(640, 480, 'game');
  Domigno.Game.loadState(PlayState);
}).call(this);

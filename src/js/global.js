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

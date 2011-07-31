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

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

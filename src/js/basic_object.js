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

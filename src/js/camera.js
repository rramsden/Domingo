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

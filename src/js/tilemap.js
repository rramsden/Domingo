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

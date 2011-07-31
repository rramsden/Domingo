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

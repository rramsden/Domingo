Screw.Unit(function() {
  describe("Game Module", function() {

    var game;

    describe("Calling Game Constructor", function() {
      it("should create a new canvas element", function() {
        var create_canvas_was_called = false;
        
        Helper.createCanvas = function(width, height, tagid) {
          create_canvas_was_called = true;
        }

        game = new Game(640,480,State,'game');
        expect(game.canvas_width).to(equal, 640);
        expect(game.canvas_height).to(equal, 480);
        expect(create_canvas_was_called).to(equal, true);
      });

      it("should set the current state", function() {
        game = new Game(640,480,State,'game');
        expect(game.state instanceof State).to(equal, true);
      });

      it("should initialize keyboard listeners", function() {
        var added_keyup_listener = false;
        var added_keydown_listener = false;
        var added_keypress_listener = false;

        window.addEventListener = function(action, fn, bubble) {
          switch(action) {
            case 'keyup': added_keyup_listener = true; break;
            case 'keydown': added_keydown_listener = true; break;
            case 'keypress': added_keypress_listener = true; break;
          }
        }

        game = new Game(640,480,State,'game');
        expect(added_keyup_listener).to(equal, true);
        expect(added_keydown_listener).to(equal, true);
        expect(added_keypress_listener).to(equal, true);
      });
    });

    describe("Changing State", function() {
      before(function() {
        game = new Game(640,480,State,'game');
      });

      it("should do cleanup before changing state", function() {
        expect(false).to(equal, true); // not implemented yet
      });

      it("should change state of the game", function() {
        var MenuState = State.extend();
        game.changeState(MenuState);
        expect(game.state instanceof MenuState).to(equal, true);
      });
    });

/*
    it("should check browser for HTML5 support", function() {
    });

    it("should set demensions for mobile devices", function() {
    });

    it("should create a new canvas element", function() {

    });

    it("should call the update loop", function() {
    });
*/
  });
});

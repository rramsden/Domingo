Screw.Unit(function() {

  describe("State Module", function() {

    // create a fake state object
    var MockState = State.extend({
      init : function() {
        this._super(); 
        var somelayer;
        this.add(somelayer);
      }
    });

    describe("Adding new Objects", function() {
      it("should add a new layer to the group", function() {

        var add_was_called = false;
       
        // override add function to test if it was called 
        MockState.prototype.add = function() {
          State.prototype.add(); // alternative to super()
          add_was_called = true; 
        }

        var mygame = new Game(640,480,MockState,'game');
        expect(add_was_called).to(equal, true);
        expect(mygame.state.groups.length).to(equal, 1);
      });
    });

    describe("Updating Objects", function() {
      it("should call update on all objects in the groups", function() {
        expect(true).to(equal, false); 
      });
    });

  });
});

Domingo.controllers = []; # callbacks for key events
Domingo.keyState = {} # hash of keys being pressed
Domingo.keyMap =
  up: [38]
  down: [40]
  right: [39]
  left: [37]
  w: [87]
  d: [68]
  s: [83]
  a: [65]
  '-': [189, 109]
  '+': [187, 61]

Domingo.keyIsPressed = (key) ->
  if Domingo.keyMap[key]
    for i in [0..Domingo.keyMap[key].length-1]
      return true if Domingo.keyState[domingo.keyMap[key][i]] == 1

Domingo.keyJustReleased = (key) -> 
  if Domingo.keyMap[key]
    for i in [0..Domingo.keyMap[key].length-1]
      return true if Domingo.keyState[domingo.keyMap[key][i]] == 2

Domingo.onKeyUp = (e) -> domingo.keyState[e.keyCode] = 2
Domingo.onKeyDown = (e) -> domingo.keyState[e.keyCode] = 1
Domingo.onMouseDown = (e) -> {}
Domingo.onMouseOver = (e) -> {}
Domingo.onMouseOut = (e) -> {}

# Add a game controller to event processing queue
#
# === Parameters
# hash<Controller>::
# {
#   up : function() { player.direction.up = 1 },
#   down : function() { player.direction.down = 0 }
# }
#
Domingo.addController = (controller) -> 
  Domingo.controllers.push(controller);    

# This method will be called every game loop. It will update
# all game controllers.
Domingo.updateController = () ->
  for controller in Domingo.controllers
    for key, callback of controller
      callback() if Domingo.keyIsPressed(key)

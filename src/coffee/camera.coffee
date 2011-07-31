##
# The camera is used to display the game. You can implement multiple cameras but only
# one camera may be active at a time by setting Domingo.camera

class Domingo.Camera

  ##
  # Creates a new camera with the width and height of the canvas

  constructor: (@width, @height) ->
    @dx = 0
    @dy = 0

  ##
  # Configure the camera to follow a game object

  follow: (object) ->
    throw Error('you can only follow instances of BasicObject') unless @following.instanceOf?( Domingo.Object2D )
    @following = object

  ##
  # Checks to see if a coordinate is visible by the camera

  checkBounds: (x, y) ->
    return true if (\
      @dx + @width >= x and 
      @dx <= x and
      @dy <= y and
      @dy + @height >= y 
    )
    return false

  update: ->
    if @following?
      newx = Math.max(@following.x - Math.floor( @width/2 ), 0)
      newy = Math.max(@following.y - Math.floor( @height/2 ), 0)

      max_dx = Domingo.map_w - Domingo.g_width
      max_dy = Domingo.map_h - Domingo.g_height

      @dx = Math.min(newx, 120) 
      @dy = Math.min(newy, max_dy)

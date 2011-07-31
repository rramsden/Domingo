##
# Your basic game sprite class

class Domingo.Sprite extends Domingo.BasicObject

  ##
  # Sprite constructor
  #
  # @param x {Integer} x-coord for location on screen
  # @param y {Integer} y-coord for location on screen
  # @param width {Integer} width of image
  # @param height {Integer} height of image
  # @param imgUrl {String} Image URL

  initialize: (@x, @y, @width, @height, @imgUrl) ->
    @frames = {}
    @image = Domingo.Resource.addImage(imgUrl)

    @scalex = @frameWidth = @width
    @scaley = @frameHeight = @height

    @canvas = document.createElement("canvas")
    @canvas.setAttribute('height', height)
    @canvas.setAttribute('width', width)
    @context = @canvas.getContext("2d")

  ##
  # @param path {String} Path to image file

  loadImage: (path, width, height) ->

  ##
  # Add animation takes a set of frames processed from the
  # loaded sprite.
  #
  # addAnimation({
  #      :up     { frames: [1], framerate: 10 },
  #      :down   { frames: [2], framerate: 10 },
  #      :run    { frames: [3,4], framerate: 10}
  # });
  #
  # @param data {Object} Javascript object containing frame information

  addAnimation: (data) ->
    @frames = data

  ##
  # Sets the current animation to be played
  #
  # @param name {String} Name of the animation
  # @param loop {Boolean} Loop the animation

  play: (@frameName, @keepLooping) ->
    @animated = true
    @slicex = @frameWidth * @frames[ @frameName ].frames[0]
    @slicey = 0 # todo : support for frame animation rows

    # calculate sprite sheet offsets for blitting
    @slicex = @frameWidth*( @frames[ @frameName ].frames[ @currentFrame ]-1 )
    @slicey = @frameHeight * 0 # todo : add row support for sprite sheets

  # not implemented
  flipx: ->
  flipy: ->
  fill: ->
  scale: (width, height) ->
  alpha: (level) ->
  color: (r,g,b) ->
  animate: -> 
  # not implemented

  setScale: (@scalex, @scaley) ->

  ##
  # Updates animation data, super method inherited from Object class
  # controls physics of object.

  update: (layers) -> 
    super(layers)
    @updateAnimation() if @animated?

  blit: (buffer) ->
    if Domingo.camera.checkBounds(@x + @scalex, @y + @scaley)
      camera_x = Domingo.camera.dx
      camera_y = Domingo.camera.dy
      buffer.drawImage(@image, @slicex, @slicey, @frameWidth, @frameHeight, @x - camera_x, @y - camera_y, @scalex, @scaley)

##
# The Core module contains the game loop and references to states and
# game objects.

class Domingo.Game

  ##
  # Game Constructor - Initializes the game, sets up canvas, state, etc
  #
  # @param width {Integer} Width of canvas
  # @param height {Integer} Height of canvas
  # @param tagid {String} ID of HTML tag to embed canvas

  constructor: (@width, @height, tagid) ->
    Domingo.camera = new Domingo.Camera(@width, @height)

    window.addEventListener('keyup', Domingo.onKeyUp, false)
    window.addEventListener('keydown', Domingo.onKeyDown, false)

    @canvas = Domingo.createCanvas("display", @width, @height)
    @context2D = @canvas.getContext('2d')
    document.getElementById(tagid).appendChild( @canvas )

  ##
  # loadState accepts an instance of +State+ this will clear
  # the current state from the DOM and reload any resources
  # required for the new state.

  loadState: (@state) ->
    throw Error('parameter must be an instance of State') unless @state.instanceOf( Domingo.State )
    @state = new state()

  loop: ->
    @state.update()

##
# Base class for in-game objects

class Domingo.BasicObject

  constructor: ->
    @uid = Domingo.BasicObject.guid()
    @width = 0
    @height = 0
    @solid = false
    @velocity = x: 0, y: 0
    @acceleration = x: 0, y: 0

  ##
  # basic collision detection returns +true+ if 
  # object is colliding with another object on the same layer 

  collide: (layers) ->
    null
    
  ##
  # used for generating unique identifier for instances of BasicObject

  @guid: ->
    S4 = -> (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())

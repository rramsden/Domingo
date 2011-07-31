##
# Organizational class used for rendering +BasicObject+'s

class Domingo.Layer

  ##
  # Crete a layer with +name+ of the layer

  constructor: (@name) ->
    @objects = {}

  ##
  # add an object to the layer

  push: (object) ->
    @objects[object.uid] = object

  get: (key) ->
    @objects[key]

  remove: (key) ->
    @objects[key].destroy()
    delete @objects[key]

  destroy: ->
    for object of @objects
      object.destroy()
    @objects = null

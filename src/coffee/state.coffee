##
# State module manages objects in a particular state ie. Menu State, Play State, etc 

class Domingo.State

  ##
  # State Constructor - intentionally left blank, except when inheriting 

  constrcutor: ->
    @layers = {}

  ##
  # Create a layer ie. background, hud, etc

  create_layer: (key) ->
    @layers[key] = new Domingo.Layer(key)

  update: ->
    for key, layer of @layers 
      for obj of layer.objects
        obj.update(@layers)

  ##
  # iterative through every object in all layers
  # and render them to passed in +buffer+

  blit: (buffer) ->
    for key, layer of @layers 
      for obj of layer.objects
        obj.blit( buffer )

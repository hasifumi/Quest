class FieldScene extends Scene
  constructor:->
    super()

    game = enchant.Game.instance

    maps = {}# {{{
    objects = {}
    for i, idx in tiled
      maps["m"+idx] = {}
      if i.background?
        map_bg = new Map(i.map.tileheight, i.map.tilewidth)
        map_bg.image = game.assets[i.image]
        map_bg.loadData.apply(map_bg, i.background)
        if i.collision?
          map_bg.collisionData = i.collision
          console.log "maps[m#{idx}].bg.collision stored"
        maps["m"+idx].bg = map_bg
        console.log "maps[m#{idx}].bg stored"
      if i.foreground?
        map_fg1 = new Map(i.map.tileheight, i.map.tilewidth)
        map_fg1.image = game.assets[i.image]
        map_fg1.loadData.apply(map_fg1, i.foreground)
        maps["m"+idx].fg1 = map_fg1
        console.log "maps[m#{idx}].fg1 stored"
      objects["m"+idx] = {}
      for name, value of i.object
        objects["m"+idx][name] = value
        console.log "objects[m#{idx}][#{name}] stored"# }}}

    stages = {}# {{{
    for name, value of maps
      console.log "stages[#{name}] stored"
      tmp_stage = new Group()
      if value.bg?  then tmp_stage.addChild value.bg
      if value.fg1? then tmp_stage.addChild value.fg1
      stages[name] = tmp_stage# }}}

    currentMap = maps.m0.bg
    currentStage = stages.m0
    currentObject = objects.m0
    player = new Player(currentMap)
    player.setMap currentMap
    currentStage.addChild player
    player.x = currentObject.playerStartPoint.x
    player.y = currentObject.playerStartPoint.y
    @addChild currentStage

    apad = new APad()
    apad.x = 0
    apad.y = 220
    @addChild apad

    @addEventListener 'enter', (e)->
      player.isMoving = false
    @addEventListener 'enterframe', (e)=>
      x = Math.min((game.width  - 32) / 2 - player.x, 0)
      y = Math.min((game.height - 32) / 2 - player.y, 0)
      x = Math.max(game.width,  x + currentMap.width)  - currentMap.width
      y = Math.max(game.height, y + currentMap.height) - currentMap.height
      currentStage.x = x
      currentStage.y = y
      for o_name, o_object of currentObject
        if player.intersect(o_object)
          #console.log "o_object[#{o_name}]: check"
          switch o_name
            when "goMap1"
              #console.log "o_object[goMap1]: start"
              currentStage.removeChild player
              @removeChild currentStage
              @removeChild apad
              #currentMap = maps[currentObject.goMap1.nextMap]
              currentMap    = maps.m1.bg
              currentStage  = stages.m1
              currentObject = objects.m1
              player.setMap currentMap
              currentStage.addChild player
              player.x = currentObject.playerStartPoint.x
              player.y = currentObject.playerStartPoint.y
              @addChild currentStage
              @addChild apad
              return

      #if player.intersect(tiled[0].object.goMap1)
      #  #@removeChild stage
      #  currentStage.removeChild player
      #  @removeChild apad
      #  currentMap = maps[tiled[0].object.goMap1.nextMap]
      #  stage2.addChild state
      #  player.x = tiled[1].object.playerStartPoint.x
      #  player.y = tiled[1].object.playerStartPoint.y
      #  player.setMap currentMap
      #  @addChild stage2
      #  currentStage = stage2
      #  @addChild apad


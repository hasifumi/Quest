class FieldScene extends Scene
  constructor:->
    super()

    game = enchant.Game.instance

    maps = {}# {{{
    objects = {}
    for i, idx in tiled
      wk_m_name = i.object.mapName.mapName
      objects[wk_m_name] = {}
      for name, value of i.object
        objects[wk_m_name][name] = value
        console.log "objects[#{wk_m_name}][#{name}] stored"# }}}
      maps[wk_m_name] = {}
      if i.background?
        map_bg = new Map(i.map.tileheight, i.map.tilewidth)
        map_bg.image = game.assets[i.image]
        map_bg.loadData.apply(map_bg, i.background)
        if i.collision?
          map_bg.collisionData = i.collision
        maps[wk_m_name].bg = map_bg
        console.log "maps[#{wk_m_name}].bg stored"
      if i.foreground?
        map_fg1 = new Map(i.map.tileheight, i.map.tilewidth)
        map_fg1.image = game.assets[i.image]
        map_fg1.loadData.apply(map_fg1, i.foreground)
        maps[wk_m_name].fg1 = map_fg1
        console.log "maps[#{wk_m_name}].fg1 stored"

    stages = {}# {{{
    for name, value of maps
      console.log "stages[#{name}] stored"
      tmp_stage = new Group()
      if value.bg?  then tmp_stage.addChild value.bg
      if value.fg1? then tmp_stage.addChild value.fg1
      stages[name] = tmp_stage# }}}

    currentMap = maps.map3_2.bg
    currentStage = stages.map3_2
    currentObject = objects.map3_2
    player = new Player(currentMap)
    player.setMap currentMap
    currentStage.addChild player
    player.x = currentObject.playerStartPoint.x
    player.y = currentObject.playerStartPoint.y
    @addChild currentStage

    pad = new Pad()
    pad.x = 0
    pad.y = 220
    @addChild pad

    @addEventListener 'enter', (e)->
      player.isMoving = false
      #setTimeout ->
      #  console.debug "sleep"
      #, 1000
    @addEventListener 'enterframe', (e)=>
      x = Math.min((game.width  - 32) / 2 - player.x, 0)
      y = Math.min((game.height - 32) / 2 - player.y, 0)
      x = Math.max(game.width,  x + currentMap.width)  - currentMap.width
      y = Math.max(game.height, y + currentMap.height) - currentMap.height
      currentStage.x = x
      currentStage.y = y
      for o_name, o_object of currentObject
        if player.intersect(o_object)
          console.log "currentObject[#{o_name}]: check"
          switch o_name
            when "goMap1", "goMap2"
              console.log "currentObject[goMap1]: start"
              console.log "o_object.nextMap:"+o_object.nextMap
              currentStage.removeChild player
              @removeChild currentStage
              @removeChild pad
              #currentMap = maps[currentObject.goMap1.nextMap]
              currentMap = maps[o_object.nextMap].bg
              currentStage  = stages[o_object.nextMap]
              currentObject = objects[o_object.nextMap]
              player.setMap currentMap
              currentStage.addChild player
              player.x = currentObject.playerStartPoint.x
              player.y = currentObject.playerStartPoint.y
              @addChild currentStage
              @addChild pad
              return

      #if player.intersect(tiled[0].object.goMap1)
      #  #@removeChild stage
      #  currentStage.removeChild player
      #  @removeChild pad
      #  currentMap = maps[tiled[0].object.goMap1.nextMap]
      #  stage2.addChild state
      #  player.x = tiled[1].object.playerStartPoint.x
      #  player.y = tiled[1].object.playerStartPoint.y
      #  player.setMap currentMap
      #  @addChild stage2
      #  currentStage = stage2
      #  @addChild pad


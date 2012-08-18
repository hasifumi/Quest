class FieldScene extends Scene
  constructor:->
    super()

    game = enchant.Game.instance

    maps = {}# {{{
    for i, idx in tiled
      console.log "maps[m#{idx}] stored"
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

    #map1_bg = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth)# {{{
    #map1_bg.image = game.assets[tiled[0].image]
    #map1_bg.loadData.apply(map1_bg, tiled[0].background)
    #if tiled[0].collision?
    #  map1_bg.collisionData = tiled[0].collision
    #map1_fg1 = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth)
    #map1_fg1.image = game.assets[tiled[0].image]
    #map1_fg1.loadData.apply(map1_fg1, tiled[0].foreground)
    #currentMap = map1_bg
    #
    #map2_bg = new Map(tiled[1].map.tileheight, tiled[1].map.tilewidth)
    #map2_bg.image = game.assets[tiled[1].image]
    #map2_bg.loadData.apply(map2_bg, tiled[1].background)
    #if tiled[1].collision?
    #  map2_bg.collisionData = tiled[1].collision
    #map2_fg1 = new Map(tiled[1].map.tileheight, tiled[1].map.tilewidth)
    #map2_fg1.image = game.assets[tiled[1].image]
    #map2_fg1.loadData.apply(map2_fg1, tiled[1].foreground)
    ##currentMap = map2_bg
# }}}

    stages = {}
    for name, value of maps
      console.log "stages[#{name}] stored"
      tmp_stage = new Group()
      if value.bg?  then tmp_stage.addChild value.bg
      if value.fg1? then tmp_stage.addChild value.fg1
      stages[name] = tmp_stage

    currentMap = maps.m1.bg
    player = new Player(currentMap)
    currentStage = stages.m1
    currentStage.addChild player
    @addChild currentStage

    #stage = new Group()# {{{
    #stage.addChild  map1_bg
    #stage.addChild  map1_fg1
    #stage.addChild  player
    #player.x = tiled[0].object.playerStartPoint.x
    #player.y = tiled[0].object.playerStartPoint.y
    ##player.setMap currentMap
    #@addChild stage
    #currentStage = stage

    #stage2 = new Group()
    #stage2.addChild  map2_bg
    #stage2.addChild  map2_fg1
    #stage2.addChild  player
    #player.x = tiled[1].object.playerStartPoint.x
    #player.y = tiled[1].object.playerStartPoint.y
    #player.setMap currentMap
    #@addChild stage2
# }}}
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
      #stage.x = x# {{{
      #stage.y = y# }}}
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


      #      if tiled[0].object.goMap1.nextMap?
      #        console.log "map1.goMap1.nextMap:"+tiled[0].object.goMap1.nextMap
      #    if player.intersect(tiled[0].object.encount1?)
      #      game.replaceScene game.scenes.battle
      #    else
      #      document.title = "Quest"
      #      #alert tiled[0].object.encount1.message

    #lbl_left = new Label("left:")# {{{
    #lbl_left.color = "red"
    #lbl_left.x = 50
    #lbl_left.y = 100
    #@addChild lbl_left
    #lbl_right = new Label("right:")
    #lbl_right.color = "red"
    #lbl_right.x = 50
    #lbl_right.y = 120
    #@addChild lbl_right
    #lbl_up = new Label("up:")
    #lbl_up.color = "red"
    #lbl_up.x = 50
    #lbl_up.y = 140
    #@addChild lbl_up
    #lbl_down = new Label("down:")
    #lbl_down.color = "red"
    #lbl_down.x = 50
    #lbl_down.y = 160
    #@addChild lbl_down
    #lbl_x = new Label()
    #lbl_x.color = "blue"
    #lbl_x.x = 50
    #lbl_x.y = 180
    #@addChild lbl_x
    #lbl_y = new Label()
    #lbl_y.color = "blue"
    #lbl_y.x = 50
    #lbl_y.y = 200
    #@addChild lbl_y
    #lbl_old_x = new Label()
    #lbl_old_x.color = "blue"
    #lbl_old_x.x = 50
    #lbl_old_x.y = 220
    #@addChild lbl_old_x
    #lbl_old_y = new Label()
    #lbl_old_y.color = "blue"
    #lbl_old_y.x = 50
    #lbl_old_y.y = 240
    #@addChild lbl_old_y
    #@addEventListener 'enterframe', ->
    #  lbl_left.text = "left:"+game.input_t.left
    #  lbl_right.text = "right:"+game.input_t.right
    #  lbl_up.text = "up:"+game.input_t.up
    #  lbl_down.text = "down:"+game.input_t.down
    #  lbl_x.text = "player x:"+player.x
    #  lbl_y.text = "player y:"+player.y
    #  lbl_old_x.text = "player old_x:"+player.old_x
    #  lbl_old_y.text = "player old_y:"+player.old_y# }}}
    
    #lbl_vx = new Label("vx  :")
    #lbl_vx.color = "red"
    #lbl_vx.x = 50
    #lbl_vx.y = 100
    #@addChild lbl_vx
    #lbl_vy = new Label("vy  :")
    #lbl_vy.color = "red"
    #lbl_vy.x = 50
    #lbl_vy.y = 120
    #@addChild lbl_vy
    #lbl_rad = new Label("rad :")
    #lbl_rad.color = "red"
    #lbl_rad.x = 50
    #lbl_rad.y = 140
    #@addChild lbl_rad
    #lbl_dist = new Label("dist:")
    #lbl_dist.color = "red"
    #lbl_dist.x = 50
    #lbl_dist.y = 160
    #@addChild lbl_dist

    #@addEventListener 'enterframe', ->
    #  lbl_vx.text = "vx  :"+apad.vx
    #  lbl_vy.text = "vy  :"+apad.vy
    #  lbl_rad.text = "rad :"+apad.rad
    #  lbl_dist.text = "dist:"+apad.dist

    #@addEventListener 'touchstart', ->
    #  console.log "field touched"
    #  game.replaceScene game.scenes.battle

    #image = game.assets['pad.png']
    #pad = new Sprite(image.width / 2, image.height)
    #pad.image = image
    #@addChild pad
    #pad = new Pad()
    #pad.x = 0
    #pad.y = 220
    #@addChild pad

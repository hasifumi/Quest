class FieldScene extends Scene
  constructor:->
    super()

    game = enchant.Game.instance

    map001 = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth)
    map001.image = game.assets[tiled[0].image]
    map001.loadData.apply(map001, tiled[0].background)
    if tiled[0].collision?
      map001.collisionData = tiled[0].collision
    #@addChild map001
    map002 = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth)
    map002.image = game.assets[tiled[0].image]
    map002.loadData.apply(map002, tiled[0].foreground)

    player = new Player(map001)
    #@addChild player

    stage = new Group()
    stage.addChild  map001
    stage.addChild  map002
    stage.addChild  player
    @addChild stage

    #pad = new Pad()
    #pad.x = 0
    #pad.y = 220
    #@addChild pad

    apad = new APad()
    apad.x = 0
    apad.y = 220
    @addChild apad

    #counter = new Label()
    #counter.text = 0
    #counter.x = 50
    #counter.y = 100
    #@addChild counter

    @addEventListener 'enter', (e)->
      player.x = 0
      player.y = 0
      player.isMoving = false
    @addEventListener 'enterframe', (e)->
      x = Math.min((game.width  - 32) / 2 - player.x, 0)
      y = Math.min((game.height - 32) / 2 - player.y, 0)
      x = Math.max(game.width,  x + map001.width)  - map001.width
      y = Math.max(game.height, y + map001.height) - map001.height
      stage.x = x
      stage.y = y
      #counter.text++
      #if counter.text % 400 is 0
      #  game.replaceScene game.scenes.battle
      if player.intersect(tiled[0].object.encount1)
        #document.title = tiled[0].object.encount1.message
        game.replaceScene game.scenes.battle
      else
        document.title = "Quest"
        #alert tiled[0].object.encount1.message

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

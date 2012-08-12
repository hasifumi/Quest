enchant()
class Quest extends Game
  config:{
    WIDTH: 320,
    HEIGHT: 320,
    FPS: 30,
    IMAGES:[
      "image/title.png"
      "image/effect0.gif"
      "image/graphic.png"
      "image/player.png"
      "image/pad.png"
      "image/apad.png"
      "image/battlebg.png"
      "image/enemy001.png"
      "image/enemy021.png"
      "image/enemy030.png"
      "image/btleffect001.png"
      "image/btleffect002.png"
      "image/btleffect003.png"
      "image/btleffect004.png"
      "image/btleffect005.png"
      "image/btleffect006.png"
      "image/btleffect007.png"
      "image/btleffect008.png"
      "image/btleffect009.png"
      "image/btleffect010.png"
    ],
  }
  constructor:->
    super(@config.WIDTH, @config.HEIGHT)
    for i in @config.IMAGES
      @preload i
    @preload(tiled[0].image)
    #Quest.game = @
    @onload = ->
      @scenes = {}
      @scenes.title = new TitleScene()
      @scenes.jobSelect = new JobSelectScene()
      @scenes.field = new FieldScene()
      @scenes.battle = new BattleScene()
      @input_t = {}
      @replaceScene @scenes.title
      return
    @start()

window.onload = ->
  new Quest


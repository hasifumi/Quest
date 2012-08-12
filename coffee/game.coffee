enchant()
class Quest extends Game
  config:{
    WIDTH: 320,
    HEIGHT: 320,
    FPS: 30,
    IMAGES:[
      "title.png"
      "effect0.gif"
      "graphic.png"
      "player.png"
      "pad.png"
      "apad.png"
      "battlebg.png"
      "enemy001.png"
      "enemy021.png"
      "enemy030.png"
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


class TitleScene extends Scene
  constructor:()->
    super()
    game = enchant.Game.instance
    bg = new Sprite(320, 320)
    bg.image = game.assets["title.png"]
    @addChild bg
    @addEventListener 'touchend',()->
      console.log "title touched"
      setInterval ->
        bg.opacity -= 0.1
      , 100
      setTimeout =>
        #game.replaceScene(game.scenes.jobSelect)
        game.replaceScene(game.scenes.field)
      , 1000


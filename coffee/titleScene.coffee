class TitleScene extends Scene
  constructor:()->
    super()
    game = enchant.Game.instance
    bg = new Sprite(320, 320)
    bg.image = game.assets["image/title.png"]
    @addChild bg

    gStartLbl = new Label("Start Game")
    gStartLbl.x = 50
    gStartLbl.y = 100
    gStartLbl.font = "30px fantasy"
    gStartLbl.color = "blue"
    @addChild gStartLbl
    gStartLbl.addEventListener 'touchend', ->
      setInterval ->
        bg.opacity -= 0.1
      , 100
      setTimeout =>
        #game.replaceScene(game.scenes.jobSelect)
        game.replaceScene(game.scenes.field)
        #game.replaceScene(game.scenes.battle)
      , 1000

    sound_on = false
    sound = game.assets["sound/bgm07.wav"].clone()
    startLbl = new Label("start music")
    startLbl.x = 50
    startLbl.y = 200
    startLbl.color = "red"
    startLbl.font = "20px"
    @addChild startLbl
    startLbl.addEventListener 'touchend',->
      sound_on = true
    pauseLbl = new Label("pause music")
    pauseLbl.x = 180
    pauseLbl.y = 200
    pauseLbl.color = "red"
    pauseLbl.font = "20px"
    @addChild pauseLbl
    pauseLbl.addEventListener 'touchend',->
      sound_on = false
    durationLbl = new Label()
    durationLbl.text = "duration: "+sound.duration
    durationLbl.x = 50
    durationLbl.y = 220
    durationLbl.color = "red"
    durationLbl.font = "20px"
    @addChild durationLbl
    currentTimeLbl = new Label()
    currentTimeLbl.text = "currentTime: "+sound.currentTime
    currentTimeLbl.x = 50
    currentTimeLbl.y = 230
    currentTimeLbl.color = "red"
    currentTimeLbl.font = "20px"
    @addChild currentTimeLbl
    @addEventListener 'enterframe',=>
      if sound_on
        sound.play()
        #startLbl.font = "20px bold"
        #pauseLbl.font = "20px normal"
      else
        sound.pause()
        #startLbl.font = "20px normal"
        #pauseLbl.font = "20px bold"
      currentTimeLbl.text = "currentTime: "+sound.currentTime

    #@addEventListener 'enter',=>
    #  sound.play()
    @addEventListener 'exit',=>
      sound.stop()

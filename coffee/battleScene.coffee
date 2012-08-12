class BattleScene extends Scene
  constructor:->
    super()

    game = enchant.Game.instance

    bg = new Sprite(320, 240)
    bg.image = game.assets["battlebg.png"]
    @addChild bg

    mon1 = new Sprite(120, 120)
    mon1.image = game.assets["enemy001.png"]
    mon1.x = 20
    mon1.y = 80
    @addChild mon1

    mon2 = new Sprite(120, 120)
    mon2.image = game.assets["enemy021.png"]
    mon2.x = 180
    mon2.y = 80
    @addChild mon2
    
    mon3 = new Sprite(320, 150)
    mon3.image = game.assets["enemy030.png"]
    mon3.x = 0
    mon3.y = 50
    #@addChild mon3

    flg = 0
    @addEventListener 'enter', ->
      flg = Math.floor(Math.random()*5)
      console.log("0:flg:"+flg)
    @addEventListener 'touchend', =>
      if flg % 5 is 1
        @removeChild mon1
        @removeChild mon2
        @addChild mon3
        flg = Math.floor(Math.random()*5)
        console.log("1:flg:"+flg)
      else if flg % 5 is 2
        game.replaceScene game.scenes.field
      else
        @removeChild mon3
        @addChild mon1
        @addChild mon2
        flg = Math.floor(Math.random()*5)
        console.log("2:flg:"+flg)

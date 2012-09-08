class BattleSceneTest extends Scene
  constructor:->
    super()

    @game = enchant.Game.instance

    bg = new Sprite(320, 240)
    bg.image = @game.assets["image/battlebg.png"]
    @addChild bg

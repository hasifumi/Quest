class JobSelectScene extends Scene
  constructor:()->
    super()
    game = enchant.Game.instance
    label = new Label("JOB SELECT")
    label.color = "blue"
    label.x = (game.width / 2) - (label.width / 2)
    label.y = (game.height / 2) - (label.height / 2)
    @addChild label

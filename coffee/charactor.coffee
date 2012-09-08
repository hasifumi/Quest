class Charactor
  constructor:(param)->
    if param.name? then @name = param.name else @name = "player1"
    if param.maxHp? then @maxHp = param.maxHp else @maxHp = 0
    @hp = @maxHp
    if param.strength? then @strength = param.strength else @strength = 5
    if param.imagefile? then @imagefile = param.imagefile else @imagefile = "image/player.png" 
  plusHp:(value)->
    @hp += value
  minusHp:(value)->
    @hp -= value
    

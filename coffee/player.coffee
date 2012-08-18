class Player extends Sprite
  constructor:(map)->
    @map = map
    super(32, 32)
    game = enchant.Game.instance
    @image = game.assets["image/player.png"]
    @frame = 0
    @isMoving = false
    @direction = 0
    @walk = 1
    @old_x = @x
    @old_y = @y
    @new_x = @x
    @new_y = @y
    @addEventListener 'enterframe', ->
      @frame = @direction * 3 + @walk
      if @isMoving
        @moveBy(@vx, @vy)
        if !(game.frame % 3)
          @walk++
          @walk %= 3
        if ((@vx isnt 0) and (@x % 32 is 0)) or ((@vy isnt 0) and (@y % 32 is 0))
          @isMoving = false
          @walk = 1
      else
        @vx = 0
        @vy = 0
        @old_x = @x
        @old_y = @y
        if (game.input_t.left)
          @direction = 1
          @vx = -4
        else if (game.input_t.right)
          @direction = 2
          @vx = 4
        else if (game.input_t.up)
          @direction = 3
          @vy = -4
        else if (game.input_t.down)
          @direction = 4
          @vy = 4
        if (@vx or @vy)
          if @vx
            @new_x = @x + (@vx / Math.abs(@vx) * 32)
          else
            @new_x = @x
          if @vy
            @new_y = @y + (@vy / Math.abs(@vy) * 32)
          else
            @new_y = @y
          if (0<=@new_x) and (@new_x<@map.width) and (0<=@new_y) and (@new_y<@map.height) and !@map.hitTest(@new_x, @new_y)
            @isMoving = true
              
  setMap:(map)->
    @map = map

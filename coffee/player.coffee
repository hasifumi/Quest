class Player extends Sprite
  constructor:(map)->
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
          #if ((@vx isnt 0) and (@x is @new_x)) or ((@vy isnt 0) and (@y is @new_y))
          #if ((@vx isnt 0) and (Math.abs(@old_x - @x) is 32)) or ((@vy isnt 0) and (Math.abs(@old_y - @y) is 32))
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
            #x = @x + (@vx / Math.abs(@vx) * 32) + 32
            @new_x = @x + (@vx / Math.abs(@vx) * 32)
          else
            #x = @x + 32
            @new_x = @x
          if @vy
            #y = @y + (@vy / Math.abs(@vy) * 32) + 32
            @new_y = @y + (@vy / Math.abs(@vy) * 32)
          else
            #y = @y + 32
            @new_y = @y
          #if (0<=x) and (x<map.width) and (0<=y) and (y<map.height)
          if (0<=@new_x) and (@new_x<map.width) and (0<=@new_y) and (@new_y<map.height) and !map.hitTest(@new_x, @new_y)
            @isMoving = true
              




    @addEventListener 'touchstart', -># {{{
      console.log "player touched"# }}}

      #        player.isMoving = false;# {{{
      #        player.direction = 0;
      #        player.walk = 1;
      #        player.addEventListener('enterframe', function() {# {{{
      #            this.frame = this.direction * 3 + this.walk;
      #            if (this.isMoving) {
      #                this.moveBy(this.vx, this.vy);
      # 
      #                if (!(game.frame % 3)) {
      #                    this.walk++;
      #                    this.walk %= 3;# }}}
      #                }# }}}
      #                if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {# {{{
      #                    this.isMoving = false;
      #                    this.walk = 1;
      #                }# }}}
      #            } else {# {{{
      #                this.vx = this.vy = 0;
      #                if (game.input.left) {
      #                    this.direction = 1;
      #                    this.vx = -4;
      #                } else if (game.input.right) {
      #                    this.direction = 2;
      #                    this.vx = 4;# }}}
      #                } else if (game.input.up) {# {{{
      #                    this.direction = 3;
      #                    this.vy = -4;
      #                } else if (game.input.down) {
      #                    this.direction = 0;
      #                    this.vy = 4;
      #                }# }}}
      #                if (this.vx || this.vy) {
      #                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
      #                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
      #                    if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
      #                        this.isMoving = true;
      #                        arguments.callee.call(this);
      #                    }
      #                }
      #            }
      #        });
      #
      #        var stage = new Group();
      #        stage.addChild(map);
      #        stage.addChild(player);
      #        stage.addChild(foregroundMap);
      #        game.rootScene.addChild(stage);
      #
      #        var pad = new Pad();
      #        pad.x = 0;
      #        pad.y = 220;
      #        game.rootScene.addChild(pad);
      #
      #        game.rootScene.addEventListener('enterframe', function(e) {
      #            var x = Math.min((game.width  - 16) / 2 - player.x, 0);
      #            var y = Math.min((game.height - 16) / 2 - player.y, 0);
      #            x = Math.max(game.width,  x + map.width)  - map.width;
      #            y = Math.max(game.height, y + map.height) - map.height;
      #            stage.x = x;
      #            stage.y = y;
      #        });
      #    };
      #    game.start();
      #};

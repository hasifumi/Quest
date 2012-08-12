class BattleScene extends Scene
  constructor:->
    super()

    @game = enchant.Game.instance

    bg = new Sprite(320, 240)
    bg.image = @game.assets["image/battlebg.png"]
    @addChild bg

    mon1 = new Sprite(120, 120)
    mon1.image = @game.assets["image/enemy001.png"]
    mon1.x = 20
    mon1.y = 80
    @addChild mon1

    mon2 = new Sprite(120, 120)
    mon2.image = @game.assets["image/enemy021.png"]
    mon2.x = 180
    mon2.y = 80
    @addChild mon2
    
    mon3 = new Sprite(320, 150)
    mon3.image = @game.assets["image/enemy030.png"]
    mon3.x = 0
    mon3.y = 50
    #@addChild mon3
    
    @eft1 = new Sprite(120, 120)
    @eft1.image = @game.assets["image/btleffect001.png"]
    @eft1.x = 180
    @eft1.y = 50
    @eft1.frameList = [0..4]
    @eft1.framIndex = 0

    btlFlg = false
    @frame = 0

    flg = 0
    @addEventListener 'enter', ->
      flg = Math.floor(Math.random()*5)
      console.log("0:flg:"+flg)
    @addEventListener 'touchend', =>
      if flg % 5 is 1
        @removeChild @eft1
        btlFlg = false
        @removeChild mon1
        @removeChild mon2
        @addChild mon3
        flg = Math.floor(Math.random()*5)
        console.log("1:flg:"+flg)
      else if flg % 5 is 2
        @removeChild @eft1
        btlFlg = false
        #@game.replaceScene @game.scenes.field
        flg = Math.floor(Math.random()*5)
        console.log("2:flg:"+flg)
      else if flg % 5 is 3
        @addChild @eft1
        btlFlg = true
        #@_randEft()
        @rand = Math.floor(Math.random()*9)
        switch @rand
          when 0
            @eft1.image = @game.assets["image/btleffect001.png"]
          when 1
            @eft1.image = @game.assets["image/btleffect002.png"]
          when 2
            @eft1.image = @game.assets["image/btleffect003.png"]
          when 3
            @eft1.image = @game.assets["image/btleffect004.png"]
          when 4
            @eft1.image = @game.assets["image/btleffect005.png"]
          when 5
            @eft1.image = @game.assets["image/btleffect006.png"]
          when 6
            @eft1.image = @game.assets["image/btleffect007.png"]
          when 7
            @eft1.image = @game.assets["image/btleffect008.png"]
          when 8
            @eft1.image = @game.assets["image/btleffect009.png"]
          when 9
            @eft1.image = @game.assets["image/btleffect010.png"]
          else
            @eft1.image = @game.assets["image/btleffect001.png"]
        flg = Math.floor(Math.random()*5)
        console.log("3:flg:"+flg)
        console.log("btlFlg:"+btlFlg)
        console.log("@rand:"+@rand)
      else
        @removeChild @eft1
        btlFlg = false
        @removeChild mon3
        @addChild mon1
        @addChild mon2
        flg = Math.floor(Math.random()*5)
        console.log("else:flg:"+flg)
    @addEventListener 'enterframe', =>
      @frame++
      if @frame % 3 is 0
        if btlFlg
          @eft1.frame++
          if @eft1.frame >= @eft1.frameList.length
            @eft1.frame = 0
            @removeChild @eft1
            btlFlg = false

  @_randEft:->
    @rand = Math.floor(Math.random()*9)
    switch @rand
      when 0
        @eft1.image = @game.assets["btleffect001.png"]
      when 1
        @eft1.image = @game.assets["btleffect002.png"]
      when 2
        @eft1.image = @game.assets["btleffect003.png"]
      when 3
        @eft1.image = @game.assets["btleffect004.png"]
      when 4
        @eft1.image = @game.assets["btleffect005.png"]
      when 5
        @eft1.image = @game.assets["btleffect006.png"]
      when 6
        @eft1.image = @game.assets["btleffect007.png"]
      when 7
        @eft1.image = @game.assets["btleffect008.png"]
      when 8
        @eft1.image = @game.assets["btleffect009.png"]
      when 9
        @eft1.image = @game.assets["btleffect010.png"]
      else
        @eft1.image = @game.assets["btleffect001.png"]

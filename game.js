(function() {
  var APad, BattleScene, FieldScene, JobSelectScene, MessageView, Pad, Player, Quest, TitleScene, roundFrame,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  enchant();

  Quest = (function(_super) {

    __extends(Quest, _super);

    Quest.prototype.config = {
      WIDTH: 320,
      HEIGHT: 320,
      FPS: 30,
      IMAGES: ["image/title.png", "image/effect0.gif", "image/graphic.png", "image/player.png", "image/pad.png", "image/apad.png", "image/battlebg.png", "image/enemy001.png", "image/enemy021.png", "image/enemy030.png", "image/btleffect001.png", "image/btleffect002.png", "image/btleffect003.png", "image/btleffect004.png", "image/btleffect005.png", "image/btleffect006.png", "image/btleffect007.png", "image/btleffect008.png", "image/btleffect009.png", "image/btleffect010.png", "sound/bgm07.wav"]
    };

    function Quest() {
      var i, _i, _len, _ref;
      Quest.__super__.constructor.call(this, this.config.WIDTH, this.config.HEIGHT);
      _ref = this.config.IMAGES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        this.preload(i);
      }
      this.preload(tiled[0].image);
      this.onload = function() {
        this.views = {};
        this.views.message = new MessageView();
        this.scenes = {};
        this.scenes.title = new TitleScene();
        this.scenes.jobSelect = new JobSelectScene();
        this.scenes.field = new FieldScene();
        this.scenes.battle = new BattleScene();
        this.input_t = {};
        this.replaceScene(this.scenes.title);
      };
      this.start();
    }

    return Quest;

  })(Game);

  window.onload = function() {
    return new Quest;
  };

  TitleScene = (function(_super) {

    __extends(TitleScene, _super);

    function TitleScene() {
      var bg, currentTimeLbl, durationLbl, gStartLbl, game, mes, pauseLbl, sound, sound_on, startLbl,
        _this = this;
      TitleScene.__super__.constructor.call(this);
      game = enchant.Game.instance;
      bg = new Sprite(320, 320);
      bg.image = game.assets["image/title.png"];
      this.addChild(bg);
      gStartLbl = new Label("Start Game");
      gStartLbl.x = 50;
      gStartLbl.y = 100;
      gStartLbl.font = "30px fantasy";
      gStartLbl.color = "blue";
      this.addChild(gStartLbl);
      gStartLbl.addEventListener('touchend', function() {
        var _this = this;
        setInterval(function() {
          return bg.opacity -= 0.1;
        }, 100);
        return setTimeout(function() {
          game.replaceScene(game.scenes.field);
          return console.log("touched");
        }, 1000);
      });
      sound_on = false;
      sound = game.assets["sound/bgm07.wav"].clone();
      startLbl = new Label("start music");
      startLbl.x = 50;
      startLbl.y = 200;
      startLbl.color = "red";
      startLbl.font = "20px";
      this.addChild(startLbl);
      startLbl.addEventListener('touchend', function() {
        return sound_on = true;
      });
      pauseLbl = new Label("pause music");
      pauseLbl.x = 180;
      pauseLbl.y = 200;
      pauseLbl.color = "red";
      pauseLbl.font = "20px";
      this.addChild(pauseLbl);
      pauseLbl.addEventListener('touchend', function() {
        return sound_on = false;
      });
      durationLbl = new Label();
      durationLbl.text = "duration: " + sound.duration;
      durationLbl.x = 50;
      durationLbl.y = 220;
      durationLbl.color = "red";
      durationLbl.font = "20px";
      this.addChild(durationLbl);
      currentTimeLbl = new Label();
      currentTimeLbl.text = "currentTime: " + sound.currentTime;
      currentTimeLbl.x = 50;
      currentTimeLbl.y = 230;
      currentTimeLbl.color = "red";
      currentTimeLbl.font = "20px";
      this.addChild(currentTimeLbl);
      this.addEventListener('enterframe', function() {
        if (sound_on) {
          sound.play();
        } else {
          sound.pause();
        }
        return currentTimeLbl.text = "currentTime: " + sound.currentTime;
      });
      this.addEventListener('exit', function() {
        return sound.stop();
      });
      mes = game.views.message;
      mes.x = 5;
      mes.y = 10;
      mes.setText("Test!</br>Test2!!");
      this.addChild(mes);
    }

    return TitleScene;

  })(Scene);

  JobSelectScene = (function(_super) {

    __extends(JobSelectScene, _super);

    function JobSelectScene() {
      var game, label;
      JobSelectScene.__super__.constructor.call(this);
      game = enchant.Game.instance;
      label = new Label("JOB SELECT");
      label.color = "blue";
      label.x = (game.width / 2) - (label.width / 2);
      label.y = (game.height / 2) - (label.height / 2);
      this.addChild(label);
    }

    return JobSelectScene;

  })(Scene);

  FieldScene = (function(_super) {

    __extends(FieldScene, _super);

    function FieldScene() {
      var apad, game, map001, map002, player, stage;
      FieldScene.__super__.constructor.call(this);
      game = enchant.Game.instance;
      map001 = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth);
      map001.image = game.assets[tiled[0].image];
      map001.loadData.apply(map001, tiled[0].background);
      if (tiled[0].collision != null) map001.collisionData = tiled[0].collision;
      map002 = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth);
      map002.image = game.assets[tiled[0].image];
      map002.loadData.apply(map002, tiled[0].foreground);
      player = new Player(map001);
      stage = new Group();
      stage.addChild(map001);
      stage.addChild(map002);
      stage.addChild(player);
      this.addChild(stage);
      apad = new APad();
      apad.x = 0;
      apad.y = 220;
      this.addChild(apad);
      this.addEventListener('enter', function(e) {
        player.x = 0;
        player.y = 0;
        return player.isMoving = false;
      });
      this.addEventListener('enterframe', function(e) {
        var x, y;
        x = Math.min((game.width - 32) / 2 - player.x, 0);
        y = Math.min((game.height - 32) / 2 - player.y, 0);
        x = Math.max(game.width, x + map001.width) - map001.width;
        y = Math.max(game.height, y + map001.height) - map001.height;
        stage.x = x;
        stage.y = y;
        if (player.intersect(tiled[0].object.encount1)) {
          return game.replaceScene(game.scenes.battle);
        } else {
          return document.title = "Quest";
        }
      });
    }

    return FieldScene;

  })(Scene);

  Player = (function(_super) {

    __extends(Player, _super);

    function Player(map) {
      var game;
      Player.__super__.constructor.call(this, 32, 32);
      game = enchant.Game.instance;
      this.image = game.assets["image/player.png"];
      this.frame = 0;
      this.isMoving = false;
      this.direction = 0;
      this.walk = 1;
      this.old_x = this.x;
      this.old_y = this.y;
      this.new_x = this.x;
      this.new_y = this.y;
      this.addEventListener('enterframe', function() {
        this.frame = this.direction * 3 + this.walk;
        if (this.isMoving) {
          this.moveBy(this.vx, this.vy);
          if (!(game.frame % 3)) {
            this.walk++;
            this.walk %= 3;
          }
          if (((this.vx !== 0) && (this.x % 32 === 0)) || ((this.vy !== 0) && (this.y % 32 === 0))) {
            this.isMoving = false;
            return this.walk = 1;
          }
        } else {
          this.vx = 0;
          this.vy = 0;
          this.old_x = this.x;
          this.old_y = this.y;
          if (game.input_t.left) {
            this.direction = 1;
            this.vx = -4;
          } else if (game.input_t.right) {
            this.direction = 2;
            this.vx = 4;
          } else if (game.input_t.up) {
            this.direction = 3;
            this.vy = -4;
          } else if (game.input_t.down) {
            this.direction = 4;
            this.vy = 4;
          }
          if (this.vx || this.vy) {
            if (this.vx) {
              this.new_x = this.x + (this.vx / Math.abs(this.vx) * 32);
            } else {
              this.new_x = this.x;
            }
            if (this.vy) {
              this.new_y = this.y + (this.vy / Math.abs(this.vy) * 32);
            } else {
              this.new_y = this.y;
            }
            if ((0 <= this.new_x) && (this.new_x < map.width) && (0 <= this.new_y) && (this.new_y < map.height) && !map.hitTest(this.new_x, this.new_y)) {
              return this.isMoving = true;
            }
          }
        }
      });
      this.addEventListener('touchstart', function() {
        return console.log("player touched");
      });
    }

    return Player;

  })(Sprite);

  BattleScene = (function(_super) {

    __extends(BattleScene, _super);

    function BattleScene() {
      var backFS, bg, btlFlg, flg, mon1, mon2, mon3,
        _this = this;
      BattleScene.__super__.constructor.call(this);
      this.game = enchant.Game.instance;
      bg = new Sprite(320, 240);
      bg.image = this.game.assets["image/battlebg.png"];
      this.addChild(bg);
      backFS = new Label("back FieldScene");
      backFS.x = 50;
      backFS.y = 10;
      backFS.color = "red";
      backFS.addEventListener('touchend', function() {
        return _this.game.replaceScene(_this.game.scenes.field);
      });
      this.addChild(backFS);
      mon1 = new Sprite(120, 120);
      mon1.image = this.game.assets["image/enemy001.png"];
      mon1.x = 20;
      mon1.y = 80;
      this.addChild(mon1);
      mon2 = new Sprite(120, 120);
      mon2.image = this.game.assets["image/enemy021.png"];
      mon2.x = 180;
      mon2.y = 80;
      this.addChild(mon2);
      mon3 = new Sprite(320, 150);
      mon3.image = this.game.assets["image/enemy030.png"];
      mon3.x = 0;
      mon3.y = 50;
      this.eft1 = new Sprite(120, 120);
      this.eft1.image = this.game.assets["image/btleffect001.png"];
      this.eft1.x = 180;
      this.eft1.y = 50;
      this.eft1.frameList = [0, 1, 2, 3, 4];
      this.eft1.framIndex = 0;
      btlFlg = false;
      this.frame = 0;
      flg = 0;
      this.addEventListener('enter', function() {
        flg = Math.floor(Math.random() * 5);
        return console.log("0:flg:" + flg);
      });
      this.addEventListener('touchend', function() {
        if (flg % 5 === 1) {
          _this.removeChild(_this.eft1);
          btlFlg = false;
          _this.removeChild(mon1);
          _this.removeChild(mon2);
          _this.addChild(mon3);
          flg = Math.floor(Math.random() * 5);
          return console.log("1:flg:" + flg);
        } else if (flg % 5 === 2) {
          _this.removeChild(_this.eft1);
          btlFlg = false;
          flg = Math.floor(Math.random() * 5);
          return console.log("2:flg:" + flg);
        } else if (flg % 5 === 3) {
          _this.addChild(_this.eft1);
          btlFlg = true;
          _this.rand = Math.floor(Math.random() * 9);
          switch (_this.rand) {
            case 0:
              _this.eft1.image = _this.game.assets["image/btleffect001.png"];
              break;
            case 1:
              _this.eft1.image = _this.game.assets["image/btleffect002.png"];
              break;
            case 2:
              _this.eft1.image = _this.game.assets["image/btleffect003.png"];
              break;
            case 3:
              _this.eft1.image = _this.game.assets["image/btleffect004.png"];
              break;
            case 4:
              _this.eft1.image = _this.game.assets["image/btleffect005.png"];
              break;
            case 5:
              _this.eft1.image = _this.game.assets["image/btleffect006.png"];
              break;
            case 6:
              _this.eft1.image = _this.game.assets["image/btleffect007.png"];
              break;
            case 7:
              _this.eft1.image = _this.game.assets["image/btleffect008.png"];
              break;
            case 8:
              _this.eft1.image = _this.game.assets["image/btleffect009.png"];
              break;
            case 9:
              _this.eft1.image = _this.game.assets["image/btleffect010.png"];
              break;
            default:
              _this.eft1.image = _this.game.assets["image/btleffect001.png"];
          }
          flg = Math.floor(Math.random() * 5);
          console.log("3:flg:" + flg);
          console.log("btlFlg:" + btlFlg);
          return console.log("@rand:" + _this.rand);
        } else {
          _this.removeChild(_this.eft1);
          btlFlg = false;
          _this.removeChild(mon3);
          _this.addChild(mon1);
          _this.addChild(mon2);
          flg = Math.floor(Math.random() * 5);
          return console.log("else:flg:" + flg);
        }
      });
      this.addEventListener('enterframe', function() {
        _this.frame++;
        if (_this.frame % 3 === 0) {
          if (btlFlg) {
            _this.eft1.frame++;
            if (_this.eft1.frame >= _this.eft1.frameList.length) {
              _this.eft1.frame = 0;
              _this.removeChild(_this.eft1);
              return btlFlg = false;
            }
          }
        }
      });
    }

    return BattleScene;

  })(Scene);

  Pad = (function(_super) {

    __extends(Pad, _super);

    function Pad() {
      var game, image;
      game = enchant.Game.instance;
      image = game.assets['image/pad.png'];
      Pad.__super__.constructor.call(this, image.width / 2, image.height);
      this.image = image;
      this.input = {
        left: false,
        right: false,
        up: false,
        down: false
      };
      this.addEventListener('touchstart', function(e) {
        return this._updateInput(this._detectInput(e.localX, e.localY));
      });
      this.addEventListener('touchmove', function(e) {
        return this._updateInput(this._detectInput(e.localX, e.localY));
      });
      this.addEventListener('touchend', function(e) {
        return this._updateInput({
          left: false,
          right: false,
          up: false,
          down: false
        });
      });
    }

    Pad.prototype._detectInput = function(x, y) {
      var input;
      x -= this.width / 2;
      y -= this.height / 2;
      input = {
        left: false,
        right: false,
        up: false,
        down: false
      };
      if (x * x + y * y > 200) {
        if ((x < 0) && (y < x * x * 0.1) && (y > x * x * -0.1)) input.left = true;
        if ((x > 0) && (y < x * x * 0.1) && (y > x * x * -0.1)) input.right = true;
        if ((y < 0) && (x < y * y * 0.1) && (x > y * y * -0.1)) input.up = true;
        if ((y > 0) && (x < y * y * 0.1) && (x > y * y * -0.1)) input.down = true;
      }
      return input;
    };

    Pad.prototype._updateInput = function(input) {
      var game;
      game = enchant.Game.instance;
      this.input = input;
      return game.input_t = input;
    };

    return Pad;

  })(Sprite);

  APad = (function(_super) {

    __extends(APad, _super);

    function APad(mode) {
      var game, h, image, insideImage, outsideImage, w;
      game = enchant.Game.instance;
      image = game.assets["image/apad.png"];
      w = this.width = image.width;
      h = this.height = image.height;
      APad.__super__.constructor.apply(this, arguments);
      this.outside = new Sprite(w, h);
      outsideImage = new Surface(w, h);
      outsideImage.draw(image, 0, 0, w, h / 4, 0, 0, w, h / 4);
      outsideImage.draw(image, 0, h / 4 * 3, w, h / 4, 0, h / 4 * 3, w, h / 4);
      outsideImage.draw(image, 0, h / 4, w / 4, h / 2, 0, h / 4, w / 4, h / 2);
      outsideImage.draw(image, w / 4 * 3, h / 4, w / 4, h / 2, w / 4 * 3, h / 4, w / 4, h / 2);
      this.outside.image = outsideImage;
      this.inside = new Sprite(w / 2, h / 2);
      insideImage = new Surface(w / 2, h / 2);
      insideImage.draw(image, w / 4, h / 4, w / 2, h / 2, 0, 0, w / 2, h / 2);
      this.inside.image = insideImage;
      this.r = w / 2;
      this.isTouched = false;
      this.vx = 0;
      this.vy = 0;
      this.rad = 0;
      this.dist = 0;
      if (mode === 'direct') {
        this.mode = 'direct';
      } else {
        this.mode = 'normal';
      }
      this.addChild(this.inside);
      this.addChild(this.outside);
      this.addEventListener('touchstart', function(e) {
        this._detectInput(e.localX, e.localY);
        this._calcPolar(e.localX, e.localY);
        this._updateImage(e.localX, e.localY);
        this.isTouched = true;
        return this._updateInput();
      });
      this.addEventListener('touchmove', function(e) {
        this._detectInput(e.localX, e.localY);
        this._calcPolar(e.localX, e.localY);
        this._updateImage(e.localX, e.localY);
        return this._updateInput();
      });
      this.addEventListener('touchend', function(e) {
        this._detectInput(this.width / 2, this.height / 2);
        this._calcPolar(this.width / 2, this.height / 2);
        this._updateImage(this.width / 2, this.height / 2);
        this.isTouched = false;
        return this._clearInput();
      });
    }

    APad.prototype._updateImage = function(x, y) {
      x -= this.width / 2;
      y -= this.height / 2;
      this.inside.x = this.vx * (this.r - 10) + 25;
      return this.inside.y = this.vy * (this.r - 10) + 25;
    };

    APad.prototype._detectInput = function(x, y) {
      var dir, distance, rad, tan;
      x -= this.width / 2;
      y -= this.height / 2;
      distance = Math.sqrt(x * x + y * y);
      tan = y / x;
      rad = Math.atan(tan);
      dir = x / Math.abs(x);
      if (distance === 0) {
        this.vx = 0;
        return this.vy = 0;
      } else if (x === 0) {
        this.vx = 0;
        if (this.mode === 'direct') {
          return this.vy = y / this.r;
        } else {
          dir = y / Math.abs(y);
          return this.vy = Math.pow(y / this.r, 2) * dir;
        }
      } else if (distance < this.r) {
        if (this.mode === 'direct') {
          this.vx = x / this.r;
          return this.vy = y / this.r;
        } else {
          this.vx = Math.pow(distance / this.r, 2) * Math.cos(rad) * dir;
          return this.vy = Math.pow(distance / this.r, 2) * Math.sin(rad) * dir;
        }
      } else {
        this.vx = Math.cos(rad) * dir;
        return this.vy = Math.sin(rad) * dir;
      }
    };

    APad.prototype._updateInput = function() {
      var game;
      game = enchant.Game.instance;
      if ((Math.abs(this.vx) > Math.abs(this.vy)) && (this.vx < 0)) {
        game.input_t.left = true;
        game.input_t.right = false;
        game.input_t.up = false;
        game.input_t.down = false;
      }
      if ((Math.abs(this.vx) > Math.abs(this.vy)) && (this.vx > 0)) {
        game.input_t.left = false;
        game.input_t.right = true;
        game.input_t.up = false;
        game.input_t.down = false;
      }
      if ((Math.abs(this.vx) < Math.abs(this.vy)) && (this.vy < 0)) {
        game.input_t.left = false;
        game.input_t.right = false;
        game.input_t.up = true;
        game.input_t.down = false;
      }
      if ((Math.abs(this.vx) < Math.abs(this.vy)) && (this.vy > 0)) {
        game.input_t.left = false;
        game.input_t.right = false;
        game.input_t.up = false;
        return game.input_t.down = true;
      }
    };

    APad.prototype._clearInput = function() {
      var game;
      game = enchant.Game.instance;
      game.input_t.left = false;
      game.input_t.right = false;
      game.input_t.up = false;
      return game.input_t.down = false;
    };

    APad.prototype._calcPolar = function(x, y) {
      var add, dist, rad;
      x -= this.width / 2;
      y -= this.height / 2;
      add = 0;
      rad = 0;
      dist = Math.sqrt(x * x + y * y);
      if (dist > this.r) dist = this.r;
      dist /= this.r;
      if (this.mode === 'normal') dist *= dist;
      if (x >= 0 && y < 0) {
        add = Math.PI / 2 * 3;
        rad = x / y;
      } else if (x < 0 && y <= 0) {
        add = Math.PI;
        rad = y / x;
      } else if (x <= 0 && y > 0) {
        add = Math.PI / 2;
        rad = x / y;
      } else if (x > 0 && y >= 0) {
        add = 0;
        rad = y / x;
      }
      if (x === 0 || y === 0) rad = 0;
      this.rad = Math.abs(Math.atan(rad)) + add;
      return this.dist = dist;
    };

    return APad;

  })(Group);

  roundFrame = (function(_super) {

    __extends(roundFrame, _super);

    function roundFrame(w, h, r) {
      var ctx, sp, sur;
      roundFrame.__super__.constructor.call(this);
      sur = new Surface(w, h);
      ctx = sur.context;
      ctx.lineWidth = 5;
      ctx.fillStyle = "#ff8c00";
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.arc(w - r, r, r, Math.PI * 1.5, 0, false);
      ctx.lineTo(w, h - r);
      ctx.arc(w - r, h - r, r, 0, Math.PI * 0.5, false);
      ctx.lineTo(r, h);
      ctx.arc(r, h - r, r, Math.PI * 0.5, Math.PI, false);
      ctx.lineTo(0, r);
      ctx.arc(r, r, r, Math.PI, Math.PI * 1.5, false);
      ctx.closePath();
      ctx.fill();
      sp = new Sprite(w, h);
      sp.image = sur;
      sp.opacity = 0.4;
      this.addChild(sp);
    }

    return roundFrame;

  })(Group);

  MessageView = (function(_super) {

    __extends(MessageView, _super);

    function MessageView() {
      var lbl;
      MessageView.__super__.constructor.call(this, 310, 26, 5);
      lbl = new Label("");
      lbl.font = "12px sans-serif";
      lbl.color = "white";
      lbl.x = 5;
      lbl.width = 310 - 5 * 2;
      lbl.height = 24;
      this.addChild(lbl);
      this.setText = function(text) {
        return lbl.text = text;
      };
    }

    MessageView.prototype.setText = function(text) {
      return this.setText(text);
    };

    return MessageView;

  })(roundFrame);

}).call(this);

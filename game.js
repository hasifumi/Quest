(function() {
  var APad, BattleScene, FieldScene, JobSelectScene, Pad, Player, Quest, TitleScene,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  enchant();

  Quest = (function(_super) {

    __extends(Quest, _super);

    Quest.prototype.config = {
      WIDTH: 320,
      HEIGHT: 320,
      FPS: 30,
      IMAGES: ["title.png", "effect0.gif", "graphic.png", "player.png", "pad.png", "apad.png", "battlebg.png", "enemy001.png", "enemy021.png", "enemy030.png"]
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
      var bg, game;
      TitleScene.__super__.constructor.call(this);
      game = enchant.Game.instance;
      bg = new Sprite(320, 320);
      bg.image = game.assets["title.png"];
      this.addChild(bg);
      this.addEventListener('touchend', function() {
        var _this = this;
        console.log("title touched");
        setInterval(function() {
          return bg.opacity -= 0.1;
        }, 100);
        return setTimeout(function() {
          return game.replaceScene(game.scenes.field);
        }, 1000);
      });
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
      var apad, game, map001, player, stage;
      FieldScene.__super__.constructor.call(this);
      game = enchant.Game.instance;
      map001 = new Map(tiled[0].map.tileheight, tiled[0].map.tilewidth);
      map001.image = game.assets[tiled[0].image];
      map001.loadData.apply(map001, tiled[0].background);
      map001.collisionData = tiled[0].collision;
      player = new Player(map001);
      stage = new Group();
      stage.addChild(map001);
      stage.addChild(player);
      this.addChild(stage);
      apad = new APad();
      apad.x = 0;
      apad.y = 220;
      this.addChild(apad);
      this.addEventListener('enterframe', function(e) {
        var x, y;
        x = Math.min((game.width - 32) / 2 - player.x, 0);
        y = Math.min((game.height - 32) / 2 - player.y, 0);
        x = Math.max(game.width, x + map001.width) - map001.width;
        y = Math.max(game.height, y + map001.height) - map001.height;
        stage.x = x;
        return stage.y = y;
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
      this.image = game.assets["player.png"];
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
      var bg, flg, game, mon1, mon2, mon3,
        _this = this;
      BattleScene.__super__.constructor.call(this);
      game = enchant.Game.instance;
      bg = new Sprite(320, 240);
      bg.image = game.assets["battlebg.png"];
      this.addChild(bg);
      mon1 = new Sprite(120, 120);
      mon1.image = game.assets["enemy001.png"];
      mon1.x = 20;
      mon1.y = 80;
      this.addChild(mon1);
      mon2 = new Sprite(120, 120);
      mon2.image = game.assets["enemy021.png"];
      mon2.x = 180;
      mon2.y = 80;
      this.addChild(mon2);
      mon3 = new Sprite(320, 150);
      mon3.image = game.assets["enemy030.png"];
      mon3.x = 0;
      mon3.y = 50;
      flg = 0;
      this.addEventListener('enter', function() {
        flg = Math.floor(Math.random() * 5);
        return console.log("0:flg:" + flg);
      });
      this.addEventListener('touchend', function() {
        if (flg % 5 === 1) {
          _this.removeChild(mon1);
          _this.removeChild(mon2);
          _this.addChild(mon3);
          flg = Math.floor(Math.random() * 5);
          return console.log("1:flg:" + flg);
        } else if (flg % 5 === 2) {
          return game.replaceScene(game.scenes.field);
        } else {
          _this.removeChild(mon3);
          _this.addChild(mon1);
          _this.addChild(mon2);
          flg = Math.floor(Math.random() * 5);
          return console.log("2:flg:" + flg);
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
      image = game.assets['pad.png'];
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
      image = game.assets["apad.png"];
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

}).call(this);

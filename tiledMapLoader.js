/**
 * tiledMapLoader.js
 * The MIT Lisence
 * Copyright (c) 2011 Tetsuroh Kunieda
 *
 * https://sites.google.com/site/tiledmaploader/
 *
 * 2011/11/29 v0.0.0
 */
(function (window, namespace) {
  /**
   * マップローダー
   * @object
   * @name mapLoader
   * @param {Array} map マップ（背景）
   * @param {Array} collision 当たり判定
   * @param {Array} foreground マップ（前景）
   */
  var mapLoader = [];
  //名前空間を設定
  if(!window[namespace]) {
    window[namespace] = mapLoader;
  }
  mapLoader.files = mapLoader.files || ['map.tmx'];
  
  /*
   * window.onloadにゲームの処理が入ってる（はず）なので一旦避難させて
   　* マップを読み込み終わってから実行させる
   　*/
  mapLoader.onload = window.onload;

  /*
   * マップを読み込む
   */
  window.onload = function() {
    for(var i = 0; i < mapLoader.files.length; i++) {
      HTTP.getText(mapLoader.files[i], mapParser, i);
    }
  };
  function xmlParser(data) {
    console.dir(data);
  }

  /*
   * 非同期通信処理
   */
  var HTTP = {};
  HTTP._factories = [
  function() {
    return new XMLHttpRequest();
  },

  function() {
    return new ActiveXObject('Msxml2.XMLHTTP');
  },

  function() {
    return new ActiveXObject('Microsoft.XMLHTTP');
  }

  ];

  HTTP._factory = null;

  HTTP.newRequest = function() {
    if(HTTP._factory != null)
      return HTTP._factory();

    for(var i = 0;i < HTTP._factories.length;i++) {
      try {
        var factory = HTTP._factories[i];
        var request = factory();
        if(request != null) {
          HTTP._factory = factory;
          return request;
        }
      } catch(e) {
        console.log(e);
        continue;
      }
    }
  };
  HTTP.getText = function(url, callback, cnt) {
    var request = HTTP.newRequest();
    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200
      || request.readyState == 4 && request.status === 0) {
        callback(request.responseText, cnt);
      }
    };
    request.open('GET', url);
    request.send(null);
  };
  HTTP.getXML = function(url, callback) {
    var request = HTTP.newRequest();
    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200
      || request.readyState == 4 && request.status === 0) {
        callback(request/*.responseXML*/);
      }
    };
    request.open('GET', url);
    request.send(null);

  };
  var object = {};
  //DOMエレメントのattributeからオブジェクトを作成して返す
  object.createFromAttr = function(source) {
    var obj = {};
    for (var i = 0; i < source.attributes.length; i++) {
      if (source.attributes[i].name !== 'name') {
        //attributeのvalueが数値にパースできたら数値を、
        //出来なかったらそのまま突っ込む
        var val = source.attributes[i].value;
        val = isNaN(parseFloat(val))? val: parseFloat(val);
        obj[source.attributes[i].name] = val;
      }
    }

    var properties = source.getElementsByTagName('property');
    for (var k = 0;k < properties.length;k++) {
      obj[properties[k].getAttribute('name')] = properties[k].getAttribute('value');
    }
    console.log(obj);
    return obj;
  };
  //まだ読み込んでいないファイル数
  var restFiles = mapLoader.files.length;
  /**
   * mapデータをパースする
   * @param {String} str 解析対象の文字列
   * @return {Array}
   */
  function mapParser(str, cnt) {
    var i, j;//counter

    restFiles -= 1;
    mapLoader[cnt] = {};
    mapLoader[cnt].map = [];
    mapLoader[cnt].background = [];
    mapLoader[cnt].collision = [];
    mapLoader[cnt].foreground = [];
    mapLoader[cnt].object = {};

    var parser = new DOMParser();
    var xml = parser.parseFromString(str, 'text/xml');//XML.parser(str);

    mapLoader[cnt].map = object.createFromAttr(xml.getElementsByTagName('map')[0]);
    mapLoader[cnt].image = xml.getElementsByTagName('image')[0].getAttribute('source');

    var layers = xml.getElementsByTagName('layer');
    //タイルレイヤー
    for(i = 0;i < layers.length;i++) {
      //レイヤーのnameがcollisionなら当たり判定レイヤ
      var isCollision = /collision/i.test(layers[i].getAttribute('name'));
      //レイヤーのnameがforegroundで始まるなら、前景レイヤ
      var isForeground = /^foreground/i.test(layers[i].getAttribute('name'));
      //レイヤがが非表示なら
      var isUnvisible = layers[i].getAttribute('visible') === '0';

      var encoding = layers[i].getElementsByTagName('data')[0].getAttribute('encoding');
      if(encoding !== 'csv') {
        alert('Tiled Map Editorの編集＞設定から「レイヤーデータの保持方法」をCSVに設定してください');
        return false;
      }

      if(isUnvisible && !isCollision)
        continue;
      var lines = layers[i].getElementsByTagName('data')[0].textContent.split(',\n');
      //レイヤーごとの行
      for(j = 0;j < lines.length;j++) {
        var params = lines[j].split(',');
        //行ごとのパラメータ
        for(var k = 0;k < params.length;k++) {
          if(isCollision) {
            params[k] = params[k] > 0?1:0;
          } else {
            params[k] = parseInt(params[k], 10) - 1;
          }
        }
        lines[j] = params;
      }
      if(isCollision) {
        mapLoader[cnt].collision = lines;
      } else if(isForeground) {
        mapLoader[cnt].foreground.push(lines);
      } else {
        mapLoader[cnt].background.push(lines);
      }
    }

    var objects = xml.getElementsByTagName('object');
    for(j = 0;j < objects.length;j++) {
      var name = objects[j].getAttribute('name');
      if(name) {
        mapLoader[cnt].object[name] = {};
        mapLoader[cnt].object[name] = object.createFromAttr(objects[j]);
      }
    }
    if(restFiles === 0) {
      console.log('すべてのマップを読み込みました');
      if (typeof mapLoader.onload === 'function') {
        mapLoader.onload();
      }
      delete mapLoader.onload;
      delete mapLoader.files;
    }
  }

})(this, 'tiled');
var game = new Phryan.Game(900, 600, Phryan.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
var type = undefined;
function preload() {
  game.load.tilemap('map', 'map/map.json', null, Phryan.Tilemap.TILED_JSON);
  game.load.spritesheet('mini','img/scorched_earth.png',128,128);
  //soldiers
  game.load.atlas('soldier', 'img/ryu/ryu.gif',         'map/soldier.json');
  game.load.atlas('sir',     'img/ryu/ryu2.gif',        'map/sir.json');
  game.load.atlas('knight',  'img/ryu/knight.gif',      'map/k.json');
  game.load.atlas('boss',    'img/enemy/boss.png',      'map/boss.json');
  game.load.atlas('enemy',   'img/enemy/enemy.png',     'map/enemy.json');
  game.load.atlas('dragon',  'img/enemy/reddragon.png', 'map/dragon.json');
}

var cursors;
function create() {
   game.physics.startSystem(Phryan.Physics.ARCADE);
   game.world.setBounds(0, 0, 1280, 960);
   game.scale.fullScreenScaleMode = Phryan.ScaleManager.SHOW_ALL;
   //game.scale.scaleMode = Phryan.ScaleManager.SHOW_ALL;
   game.scale.refresh();
   /*
   *   Map
   */
   map = game.add.tilemap('map');
   map.addTilesetImage('mini');
   layer = map.createLayer('fundo');
   layer.resizeWorld();

   game.time.advancedTiming = true;
   fpsText = game.add.text(20, 50, '', { font: '16px Arial', fill: '#fff' });

   game.input.onDown.add(goclick, this);
}

function update() {
   romanos.update(socket);

   if (game.time.fps !== 0) fpsText.setText(game.time.fps + ' FPS');
}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    // game.debug.spriteCoords(card, 32, 32);
    // game.debug.physicsBody(card.body);
}
function  goclick(a){
     x = game.rnd.integerInRange(25, 150);
     y = game.rnd.integerInRange(1, 100);
    if(type == undefined)
     type = Math.floor(Math.random() * 4 + 1);

     base = (type > 2)?{x:a.screenX+x,y:a.screenY}:{x:a.screenX-x,y:a.screenY};
     romanos.add({x:a.screenX,y:a.screenY,type:type,dono:userx,base:base});
}
function  getType(a){
  $('#card'+type).css({"background-color":"white"});
  $('#card'+a).css({"background-color":"red"});
  type = a;
}
function isObject(val) {
    return (typeof val === 'object');
}
function gofull() {
  if (game.scale.isFullScreen) {
    game.scale.stopFullScreen();
  } else {
    game.scale.startFullScreen(false);
  }
}

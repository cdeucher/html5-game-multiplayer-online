var game = new Phryan.Game(900, 600, Phryan.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

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
     type = Math.floor(Math.random() * 2 + 1);
     romanos.add({x:a.clientX,y:a.clientY,type:type,dono:userx,base:{x:a.clientX-x,y:a.clientY}});
}
function isObject(val) {
    return (typeof val === 'object');
}

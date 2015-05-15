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
var romanos;
var germanos;
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
   /*
   *   Controller
   */
   romanos = new oSpiN(game);
   romanos.add({x:800,y:200,type:1})
           .add({x:600,y:300,type:1})
            .add({x:600,y:400,type:1})
             .add({x:800,y:200,type:1})
              .add({x:600,y:300,type:1})
                .add({x:600,y:400,type:1});

   germanos = new oSpiN(game);
   germanos.add({x:200,y:200,type:4})
            .add({x:200,y:200,type:4})
             .add({x:200,y:200,type:4});

   game.time.advancedTiming = true;
   fpsText = game.add.text(20, 50, '', { font: '16px Arial', fill: '#fff' });
}

function update() {
  germanos.update(romanos);
  romanos.update(germanos);
  /*
   *   Text
   */
   if (game.time.fps !== 0) fpsText.setText(game.time.fps + ' FPS');
}

function render() {
    game.debug.cameraInfo(game.camera, 500, 32);
    // game.debug.spriteCoords(card, 32, 32);
    // game.debug.physicsBody(card.body);
}

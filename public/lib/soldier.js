/*
* Soldier
* @Autor Cristiano Boell
* conf - Object
* conf.x - int
* conf.y - int
* conf.type - int [0,1,2,3,4,5]
*/
Soldier = function (conf,_game,_socket) {
         this._id      = conf._id;
         this._socket  = _socket;
         this.x        = conf.x;
         this.y        = conf.y;
         this.type     = conf.type;
         this.dono     = conf.dono;
         this.db       = (conf.db == undefined)? false: conf.db;
         this.base     = (conf.base == undefined)? {x:0,y:0}: conf.base;
         this.alive    = true;
        switch (conf.type) {
                case 0:
                    this.soldier = game.add.sprite(this.x,this.y, 'soldier', 0);
                    this.healt  = 20;
                    this.force  = 4;
                    this.action_ATK = [7,6,5,4];
                    this.base   = this.base;
                    break;
                case 1:
                    this.soldier = game.add.sprite(this.x,this.y, 'sir', 0);
                    this.healt  = 20;
                    this.force  = 3;
                    this.action_ATK = [7,6,5,4];
                    this.base   = this.base;
                    break;
                case 2:
                    this.soldier = game.add.sprite(this.x,this.y, 'knight', 0);
                    this.healt  = 8;
                    this.force  = 1;
                    this.action_ATK = [7,6,5,4];
                    this.base   = this.base;
                    break;
                case 3:
                    this.soldier = game.add.sprite(this.x,this.y, 'enemy', 0);
                    this.healt  = 8;
                    this.force  = 1;
                    this.action_ATK = [5,6,7,8];
                    this.base   = this.base;
                    break;
                case 4:
                    this.soldier = game.add.sprite(this.x,this.y, 'boss', 0);
                    this.healt  = 18;
                    this.force  = 2;
                    this.action_ATK = [5,6,7,8];
                    this.base   = this.base;
                    break;
                case 5:
                    this.soldier = game.add.sprite(this.x,this.y, 'dragon', 0);
                    this.healt  = 60;
                    this.force  = 8;
                    this.action_ATK = [5,6,7,8];
                    this.base   = this.base;
                    break;
        }
          this.anima  = this.soldier.animations.add('atk', this.action_ATK, 4, false);
          this.anima.onComplete.add(this.stopAtk, this);
          game.physics.enable(this.soldier, Phryan.Physics.ARCADE);
      if(!this.db){ //remote does not started move
          this.soldier.animations.add('walk', [0,1,2,3], 4, true);
          this.soldier.animations.play('walk');
          this.current = 'walk';
          this.tween();
      }
};
Soldier.prototype.tween  = function(){
          this.soldier.tween = game.add.tween(this.soldier)
            .to({ x: this.base.x, y: this.base.y}, 3000, Phryan.Easing.Quadratic.InOut);
          this.soldier.tween.start();
          this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
};
Soldier.prototype.check_collision = function(enemys,socket,_centuria) {
  if(this.alive){
       this.soldier._id = this._id;
    for(i in enemys){
      if(enemys[i].alive){
          enemys[i].soldier._id = enemys[i]._id;
          game.physics.arcade.overlap(this.soldier,enemys[i].soldier, this.collision , null, this);
      }
    }
  }
};
Soldier.prototype.update = function(enemys,socket,_centuria) {
  if(this.alive){
       this.soldier._id = this._id;
       socket.emit('server_update_remote',{_id:this._id, x:this.soldier.x, y:this.soldier.y});
    for(i in enemys){
      if(enemys[i].alive){
          enemys[i].soldier._id = enemys[i]._id;
        if (this.current == undefined) {   //stop and not attack nobody
         if (game.physics.arcade.distanceBetween(this.soldier, enemys[i].soldier) < 250){
            this.current = 'walk';
            console.log('I see you men');
            socket.emit('server_move_to',{_id:this._id,enemy_id:enemys[i]._id});
         }
       }
     }
    }
  }
};
Soldier.prototype.move_to = function(data,group){
      console.log('move_to',data);
      this.current = 'walk';
      this.soldier.tween = game.add.tween(this.soldier)
         .to({ x: group[data.enemy_id].soldier.x, y: (group[data.enemy_id].soldier.y) },
         6000, Phryan.Easing.Quadratic.InOut);
      this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
      this.soldier.tween.start();
      this.soldier.animations.play('walk');
};
Soldier.prototype.collision = function(soldier,enemy){
   if(this.atk_enemy == undefined){
      this.current   = 'atk';
      this.atk_enemy = enemy._id;
      this.soldier.animations.stop('walk');
      this.soldier.tween.stop();
      socket.emit('server_collision_to',{_id:this._id,enemy_id:enemy._id});  // approve enemy in the server
      console.log('server_collision_to',soldier,enemy);
   }
};
Soldier.prototype.collision_to = function(data,group){
      console.log('client-collision-to -',data);
      this.atk_enemy = data.enemy_id;
      this.current   = 'atk';
      this.soldier.animations.stop('walk');
      this.soldier.tween.stop();
      this.soldier.animations.play('atk');
};
Soldier.prototype.stopAtk = function(){
  if(this.atk_enemy != undefined){
       this._socket.emit('server_atk_to',{_id:this._id,enemy_id:this.atk_enemy,force:this.force}); //send attack to server
  }
};
Soldier.prototype.atk_to = function(data,group) {
     console.log('attacking - ',data,group);
     group[data.enemy_id].healt -= data.force;
     if(group[data.enemy_id].healt <= 0){
       this.end_Atk();
     }else{
       console.log('atk_remote - new atk',this.healt,' - ',group[data.enemy_id].healt);
       this.soldier.animations.play('atk');  // new attack
     }
};
Soldier.prototype.end_Atk = function(enemy,anima){
       console.log('end_Atk');
       this.soldier.animations.stop('atk');

       this._socket.emit('server_kill_soldier',{_id:this.atk_enemy});//  kill enemy in to server
       this.current = undefined;
       this.atk_enemy = undefined;
};
Soldier.prototype.update_remote = function(soldier) {
     if(this.soldier.alive){

       this.soldier.x = soldier.x;
       this.soldier.y = soldier.y;
     }
};
Soldier.prototype.end_walk = function(enemy,anima){
         this.soldier.animations.stop('walk');
         this.current = undefined;
};
Soldier.prototype.walk = function(sprite,enemy) {

};
Soldier.prototype.set_mira = function(enemy) {
     this.mira = enemy;
};
Soldier.prototype.get_mira = function() {
     return this.mira;
};
Soldier.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
     this.soldier.kill();
};

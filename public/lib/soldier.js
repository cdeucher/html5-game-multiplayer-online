/*
* Soldier
* @Autor Cristiano Boell
* conf - Object
* conf.x - int
* conf.y - int
* conf.type - int [0,1,2,3,4,5]
*/
Soldier = function (conf) {
         this._id      = conf._id;
         this.x        = conf.x;
         this.y        = conf.y;
         this.type     = conf.type;
         this.dono     = conf.dono;
         this.db       = (conf.db == undefined)? false: conf.db;
         this.base     = (conf.base == undefined)? {x:0,y:0}: conf.base;
        switch (conf.type) {
                case 0:
                    this.soldier = game.add.sprite(this.x,this.y, 'soldier', 0);
                    this.soldier.healt  = 20;
                    this.soldier.force  = 4;
                    this.soldier.action_ATK = [7,6,5,4];
                    this.soldier.base   = this.base;
                    break;
                case 1:
                    this.soldier = game.add.sprite(this.x,this.y, 'sir', 0);
                    this.soldier.healt  = 20;
                    this.soldier.force  = 3;
                    this.soldier.action_ATK = [7,6,5,4];
                    this.soldier.base   = this.base;
                    break;
                case 2:
                    this.soldier = game.add.sprite(this.x,this.y, 'knight', 0);
                    this.soldier.healt  = 8;
                    this.soldier.force  = 1;
                    this.soldier.action_ATK = [7,6,5,4];
                    this.soldier.base   = this.base;
                    break;
                case 3:
                    this.soldier = game.add.sprite(this.x,this.y, 'enemy', 0);
                    this.soldier.healt  = 8;
                    this.soldier.force  = 1;
                    this.soldier.action_ATK = [5,6,7,8];
                    this.soldier.base   = this.base;
                    break;
                case 4:
                    this.soldier = game.add.sprite(this.x,this.y, 'boss', 0);
                    this.soldier.healt  = 18;
                    this.soldier.force  = 2;
                    this.soldier.action_ATK = [5,6,7,8];
                    this.soldier.base   = this.base;
                    break;
                case 5:
                    this.soldier = game.add.sprite(this.x,this.y, 'dragon', 0);
                    this.soldier.healt  = 30;
                    this.soldier.force  = 6;
                    this.soldier.action_ATK = [5,6,7,8];
                    this.soldier.base   = this.base;
                    break;
        }
          this.anima  = this.soldier.animations.add('atk', this.soldier.action_ATK, 4, false);
          this.anima.onComplete.add(this.stopAtk, this);

          this.soldier.animations.add('walk', [0,1,2,3], 4, true);
          this.soldier.animations.play('walk');
          this.anima.current = 'walk';
          game.physics.enable(this.soldier, Phryan.Physics.ARCADE);
          this.tween();
};
Soldier.prototype.tween  = function(){
          this.soldier.tween = game.add.tween(this.soldier)
            .to({ x: this.soldier.base.x, y: this.soldier.base.y}, 3000, Phryan.Easing.Quadratic.InOut);
          this.soldier.tween.start();
          this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
}
Soldier.prototype.intersects: function(a, b) {
    return a.right <= b.position.x ? !1 : a.bottom <= b.position.y ? !1 : a.position.x >= b.right ? !1 : a.position.y >= b.bottom ? !1 : !0
};

Soldier.prototype.update = function(enemys,socket) {
     if(this.soldier.alive){
       for(i in enemys){
         enemys[i].soldier._id = enemys[i]._id;
         this.soldier._id      = this._id;
         game.physics.arcade.overlap(this.soldier,enemys[i].soldier, this.collision , null, this);

         if (enemys[i].soldier.alive && this.anima.current == undefined && enemys[i].mira == undefined && enemys[i].soldier.alive) {
          if (game.physics.arcade.distanceBetween(this.soldier, enemys[i].soldier) < 250){
                   enemys[i].mira = this.soldier;//alguem persegue
                   this.anima.current = 'walk';
                   this.soldier.tween = game.add.tween(this.soldier)
                      .to({ x: enemys[i].soldier.x-70, y: (enemys[i].soldier.y - enemys[i].soldier.height) },
                      6000, Phryan.Easing.Quadratic.InOut);
                   this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
                   // to server
                   soldier = {_id:this._id,x:this.x,y:this.y,db:this.db};
                   socket.emit('server_update_soldier',soldier);//grava server
                   socket.emit('server_to_go',soldier._id,enemys[i]._id);//grava server
                    console.log('atake '+soldier._id +' -> ' +enemys[i]._id);
                   this.soldier.tween.start();
                   this.soldier.animations.play('walk');
           }
         }
       }
     }
};
Soldier.prototype.toGO = function(enemy){
          console.log('toGO '+enemy._id);
          enemy.mira = this.soldier;//alguem persegue
          this.anima.current = 'walk';
          this.soldier.tween = game.add.tween(this.soldier)
             .to({ x: enemy.soldier.x, y: enemy.soldier.y},
             6000, Phryan.Easing.Quadratic.InOut);
          this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
          this.soldier.tween.start();
          this.soldier.animations.play('walk');
}
Soldier.prototype.collision = function(soldier,enemy){
     if(this.soldier.atk == undefined){
         this.soldier.atk = enemy;
         this.soldier.animations.stop('walk');
         this.soldier.animations.play('atk');
         this.anima.current = 'atk';
         this.soldier.tween.stop();
     }
};
Soldier.prototype.end_Atk = function(enemy,anima){
      this.soldier.animations.stop('atk');
      this.anima.current = undefined;
    if(this.soldier.atk.alive){
        console.log('end_Atk');
        this.soldier.atk.alive = false;
        this.soldier.atk.kill();
        this.soldier.atk       = undefined;
     }
};
Soldier.prototype.end_walk = function(enemy,anima){
         this.soldier.animations.stop('walk');
         this.anima.current = undefined;
};
Soldier.prototype.stopAtk = function(){
  if(this.soldier.atk != undefined && this.soldier.atk.alive){
      this.soldier.atk.healt -= this.soldier.force;
       if(this.soldier.atk.healt <= 0){
         this.end_Atk();
       }else{
         this.soldier.animations.play('atk');
       }
  }
};
Soldier.prototype.walk = function(sprite,enemy) {

};
Soldier.prototype.set_mira = function(enemy) {
      this.mira = enemy;
};
Soldier.prototype.get_mira = function() {
     return this.mira;
};
Soldier.prototype.set_dano = function(dano) {
     this.soldier.healt -= dano;
};
Soldier.prototype.goKill = function(){
     this.soldier.alive = false;
     this.soldier.healt = 0;
     this.soldier.kill();
};

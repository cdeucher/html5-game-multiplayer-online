/*
* Soldier
* @Autor Cristiano Boell
* conf - Object
* conf.x - int
* conf.y - int
* conf.type - int [0,1,2,3,4,5]
*/
Soldier = function (game,conf) {
         this.x        = (conf.x == undefined)?0:conf.x;
         this.y        = (conf.y == undefined)?0:conf.y;
         this.type     = (conf.type == undefined)?0:conf.type;
         this._id      = (conf._id == undefined)?0:conf._id;
         this.dono     = (conf.dono == undefined)?0:conf.dono;
         this.game     = game;
        switch (conf.type) {
                case 0:
                    this.soldier = this.game.add.sprite(this.x-(this.game.rnd.integerInRange(5, 40)),this.y-(this.game.rnd.integerInRange(5, 40)), 'soldier', 0);
                    this.soldier.healt  = 20;
                    this.soldier.force  = 4;
                    this.soldier.action_ATK = [7,6,5,4];
                    this.soldier.base   = conf.x-this.game.rnd.integerInRange(25, 150);
                    break;
                case 1:
                    this.soldier = this.game.add.sprite(this.x-(this.game.rnd.integerInRange(5, 40)),this.y-(this.game.rnd.integerInRange(5, 40)), 'sir', 0);
                    this.soldier.healt  = 20;
                    this.soldier.force  = 3;
                    this.soldier.action_ATK = [7,6,5,4];
                    this.soldier.base   = conf.x-this.game.rnd.integerInRange(25, 150);
                    break;
                case 2:
                    this.soldier = this.game.add.sprite(this.x-(this.game.rnd.integerInRange(5, 40)),this.y-(this.game.rnd.integerInRange(5, 40)), 'knight', 0);
                    this.soldier.healt  = 8;
                    this.soldier.force  = 1;
                    this.soldier.action_ATK = [7,6,5,4];
                    this.soldier.base   = conf.x-this.game.rnd.integerInRange(25, 150);
                    break;
                case 3:
                    this.soldier = this.game.add.sprite(this.x-(this.game.rnd.integerInRange(5, 40)),this.y-(this.game.rnd.integerInRange(5, 40)), 'boss', 0);
                    this.soldier.healt  = 18;
                    this.soldier.force  = 2;
                    this.soldier.action_ATK = [5,6,7,8];
                    this.soldier.base   = conf.x+this.game.rnd.integerInRange(25, 150);
                    break;
                case 4:
                    this.soldier = this.game.add.sprite(this.x-(this.game.rnd.integerInRange(5, 40)),this.y-(this.game.rnd.integerInRange(5, 40)), 'dragon', 0);
                    this.soldier.healt  = 30;
                    this.soldier.force  = 6;
                    this.soldier.action_ATK = [5,6,7,8];
                    this.soldier.base   = conf.x+this.game.rnd.integerInRange(25, 150);
                    break;
                case 5:
                    this.soldier = this.game.add.sprite(this.x-(this.game.rnd.integerInRange(5, 40)),this.y-(this.game.rnd.integerInRange(5, 40)), 'enemy', 0);
                    this.soldier.healt  = 8;
                    this.soldier.force  = 1;
                    this.soldier.action_ATK = [5,6,7,8];
                    this.soldier.base   = conf.x+this.game.rnd.integerInRange(25, 150);
                    break;
        }
          this.anima  = this.soldier.animations.add('atk', this.soldier.action_ATK, 4, false);
          this.anima.onComplete.add(this.stopAtk, this);

          this.soldier.animations.add('walk', [0,1,2,3], 4, true);
          this.soldier.animations.play('walk');
          this.anima.current = 'walk';
          this.game.physics.enable(this.soldier, Phryan.Physics.ARCADE);
          this.tween();
};
Soldier.prototype.tween  = function(){
          this.soldier.tween = game.add.tween(this.soldier)
            .to({ x: this.soldier.base, y: this.y-this.game.rnd.integerInRange(1, 100) }, 3000, Phryan.Easing.Quadratic.InOut);
          this.soldier.tween.start();
          this.soldier.tween._lastChild.onComplete.add(this.end_walk,this);
}
Soldier.prototype.update = function(enemys) {
     if(this.soldier.alive){

     }
};
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
      this.soldier.atk.healt = (this.soldier.force);
      console.log(this.soldier.atk.healt,this.soldier.atk.force);
      console.log(this.soldier.healt,this.soldier.force);
      die
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

};

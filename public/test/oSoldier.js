
oSoldier = function (conf,game) {
         this._id      = conf._id;
         this.x        = conf.x;
         this.y        = conf.y;
         this.type     = conf.type;
         this.dono     = conf.dono;
         this.db       = (conf.db == undefined)? false: conf.db;
         this.alive    = true;
         this.healt    = 20;
         this.anima    = undefined;
         this.soldier  = {x:Math.floor(Math.random() * 900 + 1),y:Math.floor(Math.random() * 900 + 1)};
};
oSoldier.prototype.goKill = function(){
         this.alive = false;
         this.healt = 0;
};
oSoldier.prototype.update = function(socket){
         this.x = Math.floor(Math.random() * 900 + 1);
         this.y = Math.floor(Math.random() * 900 + 1);
};
oSoldier.prototype.update_remote = function(soldier) {
     if(this.alive){
       if(soldier.x != this.soldier.x)
          console.log(soldier);

        this.soldier.x = soldier.x;
        this.soldier.x = soldier.x;
        this.current   = soldier.anima;
     }
};
oSoldier.prototype.atk_remote = function(data) {
         console.log(data);
        this.healt -= data.dano;
};
module.exports = oSoldier;

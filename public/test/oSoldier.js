oSoldier = function (conf,game) {
         this._id      = conf._id;
         this.x        = conf.x;
         this.y        = conf.y;
         this.type     = conf.type;
         this.dono     = conf.dono;
         this.db       = (conf.db == undefined)? false: conf.db;
         this.soldier  = {};
};
oSoldier.prototype.goKill = function(){
         this.soldier.alive = false;
         this.soldier.healt = 0;
};
oSoldier.prototype.update = function(socket){
         this.x = Math.floor(Math.random() * 900 + 1);
         this.y = Math.floor(Math.random() * 900 + 1);
};

module.exports = oSoldier;

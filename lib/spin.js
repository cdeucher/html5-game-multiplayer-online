function oSpiN(game){
    //privates
    var _alive  = true;
    var _game   = game;
    var _centuria  = [];

    var _create = function(){

    }
    var _add = function(soldier){
         _centuria.push(new Soldier(soldier));
    }
    var _update = function(spin){

    }
    var _remove = function(dono){
        for(i in _centuria){
          if(_centuria[i].dono == dono){
              _centuria[i].goKill();
              _centuria[i].alive = false;
              _centuria[i].healt = 0;
          }
        }
    }
    //public's
    return {
        create: function(){
             return _create();
        },
        add: function(data){
             _add(data);
             return this;
        },
        get_centuria: function(){
             return _centuria;
        },
        update: function(orda){
             return _update(orda);
        },
        remove: function(data){
             return _remove(data);
        }
    };
}

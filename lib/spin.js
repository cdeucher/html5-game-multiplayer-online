function oSpiN(game){
    //privates
    var _alive  = true;
    var _game   = game;
    var _centuria  = [];

    var _create = function(){

    }
    var _add = function(soldier,socket){
      if(_centuria[soldier._id] == undefined){
          soldier.dono = socket.id;
          _centuria[soldier._id] = new Soldier(_game,soldier);
      }else{
        if(_centuria[soldier._id].dono != socket.id){
          _centuria[soldier._id].soldier.x = soldier.x;
          _centuria[soldier._id].soldier.y = soldier.y;
        }
      }
    }
    var _update = function(spin){
         for (i in _centuria){
           _centuria[i].update();
         }
    }
    //public's
    return {
        create: function(){
            return _create();
        },
        add: function(data,socket){
             _add(data,socket);
             return this;
        },
        get_centuria: function(){
             return _centuria;
        },
        update: function(orda){
             return _update(orda);
        }
    };
}

function oSpiN(data){
    //privates
    var _alive  = true;
    var _game   = data.game;
    var _socket = data.socket;
    var _centuria  = [];
    var _orda  = [];

    var _create = function(){

    }
    var _set_group = function(soldier,user){
        if(soldier.dono == user)
           _centuria.push(new oSoldier(soldier,_game,_socket));
        else
           _orda.push(new oSoldier(soldier,_game,_socket));
    }
    var _add = function(soldier){
           _socket.emit('server_set_soldier',soldier);
           //new oSoldier(soldier,_game,_socket);
    }
    var _remove = function(dono){
        for(i in _orda){
          if(_orda[i].dono == dono){
              _orda[i].goKill();
              //_orda.splice(i,1); //remove in the array
          }
        }
        console.log('killed',_orda);
    }
    var _update = function(dono,socket){
      for(i in _centuria){
        if(_centuria[i].dono == dono){
            _centuria[i].update();
            console.log('server_update_soldier',_centuria[i]);
            socket.emit('server_update_soldier',_centuria[i]);
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
        set_group: function(data){
             _set_group(data);
             return this;
        },
        get_centuria: function(){
             return _centuria;
        },
        update: function(dono,socket){
             _update(dono,socket);
        },
        remove: function(data){
             return _remove(data);
        }
    };
}

module.exports = oSpiN;

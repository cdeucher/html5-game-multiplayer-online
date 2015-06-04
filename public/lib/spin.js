function oSpiN(data){
    //privates
    var _alive  = true;
    var _game   = data.game;
    var _socket = data.socket;
    var _centuria  = [];
    var _orda   = [];

    var _create = function(){

    }
    var _set_group = function(soldier,user){
      if(soldier.dono == user)
         _centuria[soldier._id] = new Soldier(soldier,_game,_socket);
      else
         _orda[soldier._id]     = new Soldier(soldier,_game,_socket);
    }
    var _add = function(soldier){
           _socket.emit('server_set_soldier',soldier);
    }
    var _update = function(socket){
      for(i in _centuria){
        _centuria[i].update(_orda,socket,_centuria);
      }
    }
    var _update_remote = function(soldier){
      if(_orda[soldier._id] != undefined)
        _orda[soldier._id].update_remote(soldier,_centuria);
    }
    var _remove = function(dono){
      for(i in _orda){
        if(_orda[i].dono == dono){
            _orda[i].goKill();
            logme(" goKill "+_orda[i]._id);
            //_orda.splice(i,1); //remove in the array
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
        set_group: function(data,user){
             _set_group(data,user);
             return this;
        },
        get_centuria: function(){
             return _centuria;
        },
        get_orda: function(){
             return _orda;
        },
        update: function(socket){
             return _update(socket);
        },
        update_remote: function(soldier){
             return _update_remote(soldier);
        },
        remove: function(data){
             return _remove(data);
        }
    };
}

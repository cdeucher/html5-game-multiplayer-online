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
    var _check_collision = function(socket){
      for(i in _centuria){
        _centuria[i].check_collision(_orda,socket,_centuria);
      }
    }
    var _update = function(socket){
      for(i in _centuria){
        _centuria[i].update(_orda,socket,_centuria);
      }
    }
    var _update_remote = function(soldier){
      //  console.log('updating-',soldier);
      if(soldier != undefined)
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
    var _atk_to = function(socket,data){
      if(_orda[data._id] != undefined)
          _orda[data._id].atk_to(data,_centuria);
      if(_centuria[data._id] != undefined){
          _centuria[data._id].atk_to(data,_orda);
      }
    }
    var _move_to = function(socket,data){
      if(_orda[data._id] != undefined)
         _orda[data._id].move_to(data,_centuria);
      if(_centuria[data._id] != undefined)
         _centuria[data._id].move_to(data,_orda);
    }
    var _collision_to = function(socket,data){
      if(_orda[data._id] != undefined)
         _orda[data._id].collision_to(data,_centuria);
      if(_centuria[data._id] != undefined)
         _centuria[data._id].collision_to(data,_orda);
    }
    var _kill_to = function(socket,data){
          //_orda[i].goKill();
          //_orda.splice(i,1); //remove in the array
        console.log('killing -',data);
        if(_orda[data._id] != undefined)
           _orda[data._id].goKill();
        if(_centuria[data._id] != undefined)
           _centuria[data._id].goKill();
    }
    var _go = function(){
      for(i in _centuria){
        _centuria[i].soldier.x += 20;
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
        check_collision: function(socket){
             return _check_collision(socket);
        },
        atk_to: function(socket,data){
             return _atk_to(socket,data);
        },
        kill_to: function(socket,data){
             return _kill_to(socket,data);
        },
        update_remote: function(soldier){
             return _update_remote(soldier);
        },
        remove: function(data){
             return _remove(data);
        },
        move_to: function(socket,data){
             return _move_to(socket,data);
        },
        collision_to: function(socket,data){
             return _collision_to(socket,data);
        },
        go: function(){
             return _go();
        }
    };
}

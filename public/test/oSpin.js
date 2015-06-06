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
         _centuria[soldier._id] = new oSoldier(soldier,_game,_socket);
      else
         _orda[soldier._id]     = new oSoldier(soldier,_game,_socket);
    }
    var _add = function(userx){
        x    =  Math.floor(Math.random() * 600 + 1);
        y    =  Math.floor(Math.random() * 600 + 1);
        type =  Math.floor(Math.random() * 4 + 1);

        _socket.emit('server_set_soldier',{x:x,y:y,type:type,dono:userx,base:{x:x,y:y}});
    }
    var _update = function(socket){
      for(i in _centuria){
        _centuria[i].update(_orda,socket,_centuria);
      }
    }
    var _update_remote = function(soldier){
      if(soldier != undefined)
      if(_orda[soldier._id] != undefined)
        _orda[soldier._id].update_remote(soldier);
    }
    var _atk_soldier = function(socket,data){
      console.log('atk -',data);
      if(_centuria[data.remote_id] != undefined)
         _centuria[data.remote_id].atk_remote(data);
    }
    var _remove = function(dono){
      for(i in _orda){
        if(_orda[i].dono == dono){
            _orda[i].goKill();
            console.log(" goKill "+_orda[i]._id);
            //_orda.splice(i,1); //remove in the array
        }
      }
    }
    //public's
    return {
        create: function(){
             return _create();
        },
        add: function(userx){
             _add(userx);
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
        atk_soldier: function(socket,data){
             return _atk_soldier(socket,data);
        },
        remove: function(data){
             return _remove(data);
        }
    };
}

module.exports = oSpiN;

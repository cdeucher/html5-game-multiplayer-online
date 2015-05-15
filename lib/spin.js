function oSpiN(game){
    //privates
    var _alive  = true;
    var _game   = game;
    var _centuria  = game.add.group();
    var _soldiers  = [];

    var _create = function(){

    }
    var _add = function(soldier){
      sold = new  Soldier(_game,soldier);
      sold.soldier.no = sold;
      _centuria.add(sold.soldier);
    }
    var _update = function(spin){
      group_enemys = spin.get_centuria();
      for(i = 0; i < _centuria.length; i++){
        _centuria.getAt(i).no.update(group_enemys);
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
        get_soldiers: function(){
             return _soldiers;
        },
        get_centuria: function(){
             return _centuria;
        },
        update: function(orda){
             return _update(orda);
        }
    };
}


var soldiers = [];
var db_soldier_find = function (socket,db){
  db.collection('players').find({},
      function(err,docs){
        socket.emit('client_get_soldier',docs);
      }
  );
};
var db_soldier_save = function (socket,db,soldier){
  console.log(soldier);
  db.collection('players').save(soldier, function(err, saved) {
    if( err || !saved ) {
      console.log('nono',saved);
    }else{
      console.log('saved',saved);
    }
  });
};
var db_soldier_update = function (socket,db,soldier){
  /*  db.collection('players').findOne({_id:db.ObjectId(soldier._id)},//find({ _id:{ $eq:"$soldier._id" }},
        function(err,docs){
          console.log('search',soldier,docs);
        }
    );  */
    db.collection('players').findAndModify({
        query: { _id:db.ObjectId(soldier._id) },
        update: { $set: { x: soldier.x, y:soldier.y} },
        new: true
    }, function(a,b,c) {
        console.log('updated',a,b,c);
    });
};
var set_soldier = function (socket,db,soldier){
    db_soldier_save(socket,db,soldier);
};
var get_soldier = function (socket,db){
    db_soldier_find(socket,db);
};
var update_soldier = function (socket,db,soldier){
     db_soldier_update(socket,db,soldier);
};






exports.get_soldier = get_soldier;
exports.set_soldier = set_soldier;
exports.update_soldier = update_soldier;

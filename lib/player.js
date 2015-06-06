
var db_soldier_find = function (client,db,people){
   online = [];
  for(i in people){
    online.push(people[i]);
  }
    client.emit("update", "Online:");//update you
    client.emit("update", online);//update you
    console.log('online',online);

  db.collection('players').find({dono:{$in:online}},
      function(err,docs){
        for(i in docs){
          docs[i].db = true;
          client.emit('client_get_soldier',docs[i]);
        }
      }
  );
};
var db_soldier_save = function (client,db,soldier,people,groups){
    /*carregados do DB*/
    if(!soldier.db){
      db.collection('players').save(soldier, function(err, saved) {
        if( err || !saved ) {
          client.emit("update", "You NOT insert soldier.");//update you
        }else{
          client.emit("client_get_soldier",saved);
          client.emit("update","You insert soldier.");//update others
          client.broadcast.emit("client_get_soldier",saved);
          client.broadcast.emit("update", people[client.id] + " insert soldier.");//update others
          console.log(people[client.id] + " insert soldier.");
        }
      });
    }
};
var db_soldier_delete = function (client,db,dono,soldier){
    if(soldier == false){
      console.log('remove dono ',dono);
      db.collection('players').remove({dono:dono});
    }else{
      console.log('remove Soldier - ',soldier);
      db.collection('players').remove({_id:soldier});
    }
};
var db_soldier_update = function (client,db,soldier,people){      
  /*
  *   FIND
  */
  /*  db.collection('players').findOne({_id:db.ObjectId(soldier._id)},//find({ _id:{ $eq:"$soldier._id" }},
        function(err,docs){
          console.log('search',soldier,docs);
        }
    );  */
    /*
    *   UPDATE
    */
    /*
    db.collection('players').findAndModify({
        query: { _id:db.ObjectId(soldier._id) },
        update: { $set: { x: soldier.x, y:soldier.y,db:soldier.db} }
    }, function(a,b,c) {
         //console.log(people[client.id]+" update soldier - ",c);
         //client.emit("update", "You update soldier.["+soldier.x+":"+soldier.y+"]");//update you
         //client.broadcast.emit("update",people[client.id] + " update soldier.["+soldier.x+":"+soldier.y+"]");//update you
         client.broadcast.emit("client_update_soldier",soldier);//update you
    });*/
};
var set_soldier = function (socket,db,soldier,people,groups){
     return db_soldier_save(socket,db,soldier,people,groups);
};
var get_soldier = function (socket,db,people){
     db_soldier_find(socket,db,people);
};
var delete_soldier = function (socket,db,dono,soldier){
     db_soldier_delete(socket,db,dono,soldier);
};
var update_soldier = function (client,db,soldier,people){
     db_soldier_update(client,db,soldier,people);
};






exports.get_soldier = get_soldier;
exports.set_soldier = set_soldier;
exports.delete_soldier = delete_soldier;
exports.update_soldier = update_soldier;



var mys = {};
var enemys = {};

var show = function(client,mys,enemys){
    console.log(mys,enemys);
    /*for(i in mys){
      for(i in enemys){
         if(mys[i].x == enemys[i].x){
           console.log(mys[i].x , enemys[i].x);
           client.broadcast.emit("client_collision_soldier",mys[i],enemys[i]);
         }
      }
    }*/
}

var find_collision = function (client,db,people){
   /*online  = [];
  for(i in people){
    online.push(people[i]);
  }

  db.collection('players').find({dono:{$in:online}},
      function(err,docs){
        for(i in docs){
          if(docs[i].dono == people[client.id]){
            mys[client.id] = docs[i];
          }else{
            mys[client.id] = docs[i];
          }
        }
        show(client,mys,enemys);
      }
  );*/
};

exports.find_collision = find_collision

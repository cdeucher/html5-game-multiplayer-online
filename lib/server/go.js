
var db = require('./mongo');

for (i=0;i<6;i++)
   db.collection('players').save({centuria:"romanos",x:200,y:200,type:1});

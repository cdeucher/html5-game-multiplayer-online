var mongojs = require('mongojs');

var dbName = "/game";
//var databaseUrl = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +  process.env.OPENSHIFT_MONGODB_DB_PORT+ dbName;
var databaseUrl = "localhost"+ dbName;

//var db = require("mongojs").connect(databaseUrl, collections);
var db = mongojs(databaseUrl, ["players"]);
module.exports = db;

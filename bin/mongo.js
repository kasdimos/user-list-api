const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

// This is a global variable we'll use for handing the MongoDB client
var mongodb;

module.exports = function(cb){
  module.exports.mongodb = mongo;
  const promise = new Promise(function(resolve, reject){
    MongoClient.connect(
      'mongodb://127.0.0.1:27017',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        poolSize: 10
      },
      function(err, db){
        if (err != null) return reject(err);
        mongodb = db;
        module.exports.db = mongodb;
        console.log('Connected to MongoDB');
        resolve(db);
      }
    );
  });
  
  if (cb && typeof cb == 'function'){
    promise.then(cb.bind(null, null), cb);
  }
  return promise;
};

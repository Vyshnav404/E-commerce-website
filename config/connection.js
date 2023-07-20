const { error } = require('console');

const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

module.exports.connect = function(done) {
  const url = 'mongodb+srv://hrmanagement:hrmanagement@hrmanagement.pkak7gi.mongodb.net/HRManagement?retryWrites=true&w=majority';
  const dbname = 'Ecommerce';


  try {
    
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      console.log("mongoe ===",err);
      if (err) {
        return done(err);
      }
      // state.db = client.db(dbname);
      done();
    });
  } catch (error) {
    console.log("what is mongo error==",error);
  }
};

module.exports.get = function() {
  return state.db;
};


// mongodb+srv://vyshnav404:<password>@woodq-ecommerce.3mxv8uj.mongodb.net/
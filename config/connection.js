const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

module.exports.connect = function(done) {
  const url = 'mongodb://0.0.0.0:27017';
  const dbname = 'Ecommerce';

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      return done(err);
    }
    state.db = client.db(dbname);
    done();
  });
};

module.exports.get = function() {
  return state.db;
};

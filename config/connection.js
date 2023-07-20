const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

module.exports.connect = function(done) {
  const url = 'mongodb+srv://vyshnav404:cxpqwhpRjbDb8rBT@woodq-ecommerce.3mxv8uj.mongodb.net/Ecommerce';
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


// mongodb+srv://vyshnav404:<password>@woodq-ecommerce.3mxv8uj.mongodb.net/
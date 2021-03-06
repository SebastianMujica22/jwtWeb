const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "jwt";

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
  client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);

    callback(db, client);
  });
};

const findDocuments = function (db, callback) {
  const collection = db.collection("users");
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

const findUser = function (db, callback, username, password) {
  const collection = db.collection("users");
  collection.findOne({ username: username }, function (err, res) {
    assert.equal(err, null);
    callback(res);
  });
};

const createUser = function (db, user) {
  const collection = db.collection("users");
  collection.insert(user);
};

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.findUser = findUser;
exports.createUser = createUser;

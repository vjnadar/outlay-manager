const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;
let _db;
let _client;

const connectToDb = listenCallBack => {
  const url=process.env.NODE_ENV==="DEV"?process.env.MONGO_HOST_DEV:process.env.MONGO_HOST_PROD;
  console.log(url);
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      console.log("Connected!");
      _client = client;
      _db = client.db();
      listenCallBack();
    })
    .catch(err => {
      throw err;
    });
};

const getDbAccess = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("Cannot access the database!");
  }
};

exports.connectToDb = connectToDb;
exports.getDbAccess = getDbAccess;

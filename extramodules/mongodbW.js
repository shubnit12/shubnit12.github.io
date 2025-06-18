require("dotenv/config");
const { MongoClient } = require("mongodb");
const MONGOPASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://PersonalWebsiteMondoClusterUser1:${MONGOPASSWORD}@personalwebsitemodbclus.whlyyhw.mongodb.net/?retryWrites=true&w=majority&appName=PersonalWebsiteMoDBCluster1`;
// console.log("uri ", uri);
const dbName = "sample_mflix";
let database;
let connection;

async function mongoConnection() {
  try {
    const client = new MongoClient(uri);
    connection = await client.connect();
    console.log("Client Conected Successfully");
  } catch (error) {
    console.error(error.body);
    console.error(error);
  }
  // let connection = await mongoConnection();

  return database;
}
mongoConnection().then(async (database) => {
  database = await connection.db(dbName);
  const collection = database.collection("users");
  const cursor = await collection.findOne({
    name: "Ned Stark",
  });
  console.log(cursor);
});

module.exports = database;

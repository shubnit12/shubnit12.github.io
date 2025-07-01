require("dotenv/config");
const { MongoClient } = require("mongodb");
const MONGOPASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://PersonalWebsiteMondoClusterUser1:${MONGOPASSWORD}@personalwebsitemodbclus.whlyyhw.mongodb.net/?retryWrites=true&w=majority&appName=PersonalWebsiteMoDBCluster1`;
console.log("uri ", uri);

module.exports = async function MongoDBConnection() {
  const dbName = "PersonalWebsiteDB";
  const client = new MongoClient(uri);
  const connection = await client.connect();
  console.log("Client Conected Successfully");
  const database = await connection.db(dbName);
  const collection = database.collection("ArticleCollection");
  return collection;
};
// MongoDBConnection();

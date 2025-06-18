import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";
const MONGOPASSWORD = process.env.MONGO_PASSWORD;
const PORT = process.env.PORT;
console.log("PORT ", PORT);
const uri = `mongodb+srv://PersonalWebsiteMondoClusterUser1:${MONGOPASSWORD}@personalwebsitemodbclus.whlyyhw.mongodb.net/?retryWrites=true&w=majority&appName=PersonalWebsiteMoDBCluster1`;
console.log("uri ", uri);
const client = new MongoClient(uri);
let connection;
connection = await client.connect();
console.log("Client Conected Successfully");
try {
} catch (error) {
  // console.error(error.body);
  //   console.error(error);
}
const dbName = "sample_mflix";
let database = connection.db("sample_mflix");

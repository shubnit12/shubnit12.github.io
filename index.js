require("dotenv/config");
const express = require("express");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const port = process.env.PORT;
const app = express();
const secretDataJSON = path.join(
  __dirname,
  "private",
  "personalwebsiteKeys.json"
);
require("dotenv/config");
const { MongoClient } = require("mongodb");
const MONGOPASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://PersonalWebsiteMondoClusterUser1:${MONGOPASSWORD}@personalwebsitemodbclus.whlyyhw.mongodb.net/?retryWrites=true&w=majority&appName=PersonalWebsiteMoDBCluster1`;
// console.log("uri ", uri);
const dbName = "sample_mflix";
let database;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pp.html"));
});

app.get("/Resume", (req, res) => {
  console.log("Downloading Resume");
  async function downloadFile(realFileId) {
    async function authenticate() {
      const auth = new GoogleAuth({
        keyFile: secretDataJSON,
        scopes: "https://www.googleapis.com/auth/drive", // Scope for Google Drive access
      });

      const client = await auth.getClient();
      return client;
    }
    let auth = await authenticate();
    const service = google.drive({ version: "v3", auth });

    try {
      const result = await service.files.export({
        fileId: realFileId,
        mimeType: "application/pdf",
      });
      console.log(result.status);
      console.log(result.data.type);

      try {
        const arrayBuffer = await result.data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        res.set({
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=ShubnitResume.pdf",
        });
        res.send(buffer);
        console.log("File saved successfully!");
      } catch (error) {
        console.error("Error saving file:", error);
      }
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  }
  let id = "1ijEORjmTnpg2q4MuZcGKMUuYGoYzOsSjyMvMF8AeZCA";
  try {
    downloadFile(id);
  } catch (error) {}
});

app.get("/test", async (req, res) => {
  const collection = database.collection("users");
  const cursor = await collection.findOne({
    name: "Ned Stark",
  });
  console.log(cursor);
});
app.listen(port, async () => {
  const client = new MongoClient(uri);
  connection = await client.connect();
  console.log("Client Conected Successfully");
  database = await connection.db(dbName);
  console.log(`Example app listening on port ${port}`);
});

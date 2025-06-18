const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
import database from "./mongodbW.js";
const secretDataJSON = path.join(
  __dirname,
  "private",
  "personalwebsiteKeys.json"
);
console.log(secretDataJSON);

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

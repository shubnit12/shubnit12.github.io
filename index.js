require("dotenv/config");
const express = require("express");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const cors = require("cors");
const multer = require("multer");
const MongoDBConnection = require("./mongoDB");

const port = 4000;
const app = express();
app.use(cors());
const secretDataJSON = path.join(
  __dirname,
  "private",
  "personalwebsiteKeys.json"
);
require("dotenv/config");
const { MongoClient } = require("mongodb");
const MONGOPASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://PersonalWebsiteMondoClusterUser1:${MONGOPASSWORD}@personalwebsitemodbclus.whlyyhw.mongodb.net/?retryWrites=true&w=majority&appName=PersonalWebsiteMoDBCluster1`;
console.log("uri ", uri);
console.log("secretDataJSON ", secretDataJSON);
let collection;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pp.html"));
});

app.get("/resume", (req, res) => {
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
  const cursor = await collection
    .find({
      "article.blocks.data.text": "This is Bombardillo crocodillo H1",
    })
    .toArray();
  // console.log(cursor[0].article.blocks);
  res.status(200).send(cursor[0]);
});

// Configure Multer to specify the upload folder and filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save images to 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add timestamp to filenames
  },
});

const upload = multer({ storage });

// Endpoint to handle image uploads
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded." });
  }

  // Return the file URL
  res.status(200).send({
    success: true,
    file: {
      url: `http://localhost:4000/uploads/${req.file.filename}`, // File URL to access the uploaded file
    },
  });
});
app.post("/download", async (req, res) => {
  res.status(200).send({
    success: true,
    file: {
      url: `http://localhost:4000/uploads/${req.file.filename}`,
    },
  });
});

app.listen(port, async () => {
  collection = await MongoDBConnection();
  console.log(`Example app listening on port ${port}`);
});

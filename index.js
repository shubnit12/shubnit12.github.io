require("dotenv/config");
const express = require("express");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const cors = require("cors");
const multer = require("multer");
const MongoDBConnection = require("./mongoDB");
const fetch = require("node-fetch-cjs");
const axios = require("axios");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const secretkey = "honeysecretkey";
const s3Use = require("./s3Use");
const port = 4000;
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.shubnit.com",
      "https://api.shubnit.com",
      "https://shubnit.com",
      "https://blog.shubnit.com",
    ],
    credentials: true,
  })
);
const secretDataJSON = path.join(
  __dirname,
  "private",
  "personalwebsiteKeys.json"
);
require("dotenv/config");
const { MongoClient } = require("mongodb");
const mongoDB = require("./mongoDB");
const MONGOPASSWORD = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://PersonalWebsiteMondoClusterUser1:${MONGOPASSWORD}@personalwebsitemodbclus.whlyyhw.mongodb.net/?retryWrites=true&w=majority&appName=PersonalWebsiteMoDBCluster1`;
console.log("uri ", uri);
console.log("secretDataJSON ", secretDataJSON);
let database;
let ArticleCollection;
let userCollection;
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "public")));

function authenticateUser(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("access debnied n token providfed");
  }
  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    console.log("req.user ", req.user);
    next();
  } catch (error) {
    return res.status(400).send("invalid token");
  }
}

app.get("/protectedroute", authenticateUser, (req, res) => {
  res.send("thisis protyested route access successfull");
});

app.post("/login", async (req, res) => {
  if (req.body === undefined) {
    return res.send("User Not Provided");
  }

  const user = req.body.user;
  console.log(user.id);
  let isUserinDB = await userCollection.findOne({
    "user.id": user.id,
    "user.password": user.password,
  });
  console.log("isUserinDB", isUserinDB);
  if (!isUserinDB) {
    return res
      .status(401)
      .json({ error: "Authentication failed No User in Db" });
  }
  const token = jwt.sign({ user }, secretkey, { expiresIn: "2h" });
  user.JWTtoken = token;
  res.set({ "Content-Type": "text/plain" });

  res.cookie("ShubnitToken", token, {
    httpOnly: false,
    secure: false,
    sameSite: "None",
  });
  res.header("Authorization", token).send(user);
});

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

app.post("/getArticleByID", async (req, res) => {
  const cursor = await ArticleCollection.find({
    _id: new ObjectId(req.body.id),
  }).toArray();
  res.status(200).send(cursor);
});

app.get("/getAllArticles", async (req, res) => {
  const cursor = await ArticleCollection.find({}).toArray();
  // const cursor = await collection.find({}).toArray();
  res.status(200).send(cursor);
});
app.post("/addArticle", authenticateUser, async (req, res) => {
  let data = req.body;
  console.log();
  const cursor = await ArticleCollection.insertOne({
    article: data,
  });
  res.status(200).send({ serverResponse: cursor });
});
app.post("/updateArticle", authenticateUser, async (req, res) => {
  let articleID = req.body._id;
  let articleData = req.body.article;

  const cursor = await ArticleCollection.replaceOne(
    { _id: new ObjectId(articleID) },
    { article: articleData }
  );
  console.log(cursor);
  res.status(200).send(cursor);
});
let nameOfUploadedFile = "";
// Configure Multer to specify the upload folder and filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save images to 'uploads' directory
  },
  filename: (req, file, cb) => {
    nameOfUploadedFile = Date.now() + "-" + file.originalname;
    cb(null, nameOfUploadedFile); // Add timestamp to filenames
  },
});

const upload = multer({ storage });

// Endpoint to handle image uploads
app.post("/upload", upload.single("image"), async (req, res) => {
  // console.log(req);
  console.log("  nameOfUploadedFile : ", nameOfUploadedFile);
  let dataObject = {
    fileName: nameOfUploadedFile,
    filePath: path.join(__dirname, "uploads", nameOfUploadedFile),
  };
  await s3Use.uploadFileToAwsS3(dataObject);

  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded." });
  }

  // Return the file URL
  res.status(200).send({
    success: true,
    file: {
      url: `https://api.shubnit.com/download/${nameOfUploadedFile}`, // File URL to access the uploaded file
    },
  });
});
app.get("/download/:imageFileName", async (req, res) => {
  let dataObject = {
    fileName: req.params.imageFileName,
  };
  console.log("dataObject : ", dataObject);
  let imageURL = await s3Use.getFileFromAwsS3(dataObject);
  console.log("imageURL : ", imageURL);
  // let response = await fetch(imageURL);
  const response = await axios.get(imageURL, { responseType: "stream" });
  response.data.pipe(res);
  // res.status(200).send({
  //   success: true,
  //   file: {
  //     url: imageURL,
  //   },
  // });
});

app.get("/validateJwtToken", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("access denied no token providfed");
  }
  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    // console.log("req.user ", req.user);
    res.status(200).send({ tokenIsValid: true });
  } catch (error) {
    return res.status(200).send({ tokenIsValid: false });
  }
});
app.get("/testing", (req, res) => {
  res.cookie("mycookie", "mydatacookie", {
    httpOnly: false,
    secure: false,
  });
  res.status(200).send("cookie has been sent");
});

app.listen(port, async () => {
  database = await MongoDBConnection();
  ArticleCollection = database.collection("ArticleCollection");
  userCollection = database.collection("Users");
  console.log(`Example app listening on port ${port}`);
});

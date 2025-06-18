const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
var path = require("path");
const fs = require("fs");
const secretDataJSON = path.join(__dirname, "personalwebsiteKeys.json");
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
      let filePath = path.join(__dirname, "ShubnitResume.pdf");
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
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

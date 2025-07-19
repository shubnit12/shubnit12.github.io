require("dotenv/config");

const {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACESSKEY,
  },
});

exports.uploadFileToAWS = async (fileName, filePath) => {
  // async function uploadFileToAWS(fileName, filePath) {
  try {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fs.createReadStream(filePath),
    };

    await s3Client.send(new PutObjectCommand(uploadParams)).then((data) => {
      console.log("uploaded file data : ", data);
      if (fs.existsSync(filePath)) {
        // fs.unlink(filePath, (err) => {
        //   if (err) {
        //     console.error("Error while deleting file ", err);
        //   } else {
        //     console.log("File deleted Successfully");
        //   }
        // });
      }
    });
  } catch (error) {
    console.log("Error: ", error);
    return error;
  }
};

exports.getFileUrlFromAws = async (fileName, expireTime = null) => {
  // async function getFileUrlFromAws(fileName, expireTime = null) {
  try {
    const check = await isFileAvailableInAwsBucket(fileName);
    if (check) {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
      });
      if (expireTime != null) {
        const url = await getSignedUrl(s3Client, command, {
          expiresIn: expireTime,
        });
        return url;
      } else {
        const url = await getSignedUrl(s3Client, command);
        return url;
      }
    } else {
      return "error: file is not available in s3 Bucket";
    }
  } catch (error) {
    console.log("error : ", error);
    return error;
  }
};
// exports.isFileAvailableInAwsBucket = async (fileName) => {
async function isFileAvailableInAwsBucket(fileName) {
  console.log("isFileAvailableInAwsBucket file nam is : ", fileName);
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
      })
    );
    return true;
  } catch (error) {
    if (error.name === "NotFound") {
      return false;
    } else {
      console.log("Error is other than not found error: ", error);
      return false;
    }
  }
}
// function main() {
//   async function submain() {
//     // await uploadFileToAWS(
//     //   "1752912368974-on-a-scale-of-1-to-10-how-excited-are-you-right-now-for-v0-qpukbrj4xfze1.webp",
//     //   "D:/PersonalWebsite/shubnit12.github.io/uploads/1752912368974-on-a-scale-of-1-to-10-how-excited-are-you-right-now-for-v0-qpukbrj4xfze1.webp"
//     // );
//     let urltobestoredinMongoDB = await getFileUrlFromAws(
//       "1752912368974-on-a-scale-of-1-to-10-how-excited-are-you-right-now-for-v0-qpukbrj4xfze1.webp"
//     );
//     console.log("urltobestoredinMongoDB: ", urltobestoredinMongoDB);
//   }
//   submain();
// }
// main();

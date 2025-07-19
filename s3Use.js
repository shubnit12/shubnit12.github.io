const awsS3connect = require("./awsS3connect");

exports.uploadFileToAwsS3 = async function (dataObject) {
  try {
    await awsS3connect.uploadFileToAWS(
      dataObject.fileName,
      dataObject.filePath
    );
  } catch (error) {
    console.error("Error in uploading the file to AWS S3", error);
  }
};
exports.getFileFromAwsS3 = async function (dataObject) {
  try {
    const fileUrl = await awsS3connect.getFileUrlFromAws(dataObject.fileName);
    console.log("File Url : ", fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error in Getting the file fom AWS S3", error);
    throw error;
  }
};

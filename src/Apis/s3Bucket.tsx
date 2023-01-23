import AWS from "aws-sdk";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
});
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = (userId: string, file: File) => {
  try {
    const Key = `${userId}/${file.name}`;
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key,
    };
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
    return Key;
  } catch {
    return undefined;
  }
};

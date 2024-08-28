import "dotenv/config";

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;
const SENDER_EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.PASSWORD;
const SECRET = process.env.SECRET;

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export {
  MONGODB_URI,
  PORT,
  SENDER_EMAIL,
  EMAIL_PASSWORD,
  SECRET,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET_NAME,
};

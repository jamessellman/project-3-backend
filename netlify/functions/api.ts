import express from "express";
import mongoose from "mongoose";
import router from "../../views/Router";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors"; // Added this new import
import serverless from "serverless-http"; // added this new import
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(router);

async function start() {
  const mongoURL = process.env.MONGO_DB_URL as string;
  await mongoose.connect(mongoURL);
}
start();
export const handler = serverless(app);

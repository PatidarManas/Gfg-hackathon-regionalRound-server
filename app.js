import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import seekerroutes from "./routes/seekerroutes.js";
import { Application } from "./models/Application.js";
import { acknowledment } from "./models/acknowledment.js";
import providerroutes from "./routes/providerroutes.js";
import transactionroutes from "./routes/transactionroutes.js";

config({
  path: "./config/config.env",
});
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

export default app;
app.use("/seeker",seekerroutes)
app.use("/provider",providerroutes)
app.use("/transaction",transactionroutes)

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

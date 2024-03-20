import express from "express";
import bodyParser from "body-parser";
import { Producer } from "./producer.js";

const app = express();
app.use(bodyParser.json("application/json"));

const producer = new Producer();

app.post("/sendLog", async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);

  res.send().status(200);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

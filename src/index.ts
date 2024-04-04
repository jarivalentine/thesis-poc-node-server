import express from "express";
import router from "./routes";
import bodyParser from "body-parser";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

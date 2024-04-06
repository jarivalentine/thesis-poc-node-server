import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import * as dotenv from "dotenv";
dotenv.config();

import router from "./routes";
import eventHandler from "./sockets";
import { authenticateSocket } from "./middleware/authenticateSocket";

const app = express();
const port = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  },
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use("/", router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

io.use(authenticateSocket);
eventHandler(io);

import express from "express";
import authMiddleware, {
  AuthenticatedRequest,
} from "./middleware/authMiddleware";
import { UserController } from "./controllers/userController";
import { WorkspaceController } from "./controllers/workspaceController";
import TaskController from "./controllers/taskController";
import { EventEmitter } from "events";

const router = express.Router();
const eventEmitter = new EventEmitter();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/workspace", authMiddleware, WorkspaceController.list);
router.get("/workspace/:name", authMiddleware, WorkspaceController.get);
router.post("/workspace", authMiddleware, WorkspaceController.create);
router.post("/workspace/:name/invite", authMiddleware, (req, res) =>
  WorkspaceController.invite(req, res, eventEmitter)
);

router.get("/workspace/:name/board", authMiddleware, TaskController.getAll);

router.get("/sse", (req, res) => {
  const username = req.query.username as string;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  eventEmitter.on(`invite:${username}`, (data) =>
    res.write(`event: invite:${username}\ndata: ${JSON.stringify(data)}\n\n`)
  );

  res.on("close", () => {
    eventEmitter.off(`test`, (data) => res.write(data));
  });
});

export default router;

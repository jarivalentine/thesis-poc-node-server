import express from "express";
import authMiddleware from "./middleware/authMiddleware";
import { UserController } from "./controllers/userController";
import { WorkspaceController } from "./controllers/workspaceController";
import TaskController from "./controllers/taskController";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/workspace", authMiddleware, WorkspaceController.list);
router.get("/workspace/:name", authMiddleware, WorkspaceController.get);
router.post("/workspace", authMiddleware, WorkspaceController.create);
router.post(
  "/workspace/:name/invite",
  authMiddleware,
  WorkspaceController.invite
);

router.get("/workspace/:name/board", authMiddleware, TaskController.getAll);

export default router;

import express from "express";
import authMiddleware from "./authMiddleware";
import { UserController } from "./controllers/userController";
import { WorkspaceController } from "./controllers/workspaceController";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/workspace", authMiddleware, WorkspaceController.list);
router.post("/workspace", authMiddleware, WorkspaceController.create);
router.post(
  "/workspace/:name/invite",
  authMiddleware,
  WorkspaceController.invite
);

export default router;

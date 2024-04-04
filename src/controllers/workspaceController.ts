import { Response } from "express";
import { AuthenticatedRequest } from "../authMiddleware";
import { WorkspaceService } from "../services/workspaceService";

export class WorkspaceController {
  static async list(req: AuthenticatedRequest, res: Response) {
    const user = req.user;

    try {
      const workspaces = await WorkspaceService.list(user);
      res.status(200).json(workspaces);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    const { name } = req.body;
    const user = req.user;

    try {
      await WorkspaceService.create(name, user);
      res.status(201).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async invite(req: AuthenticatedRequest, res: Response) {
    const { name } = req.params;
    const { userName } = req.body;
    const user = req.user;

    try {
      await WorkspaceService.invite(name, userName, user);
      res.status(200).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

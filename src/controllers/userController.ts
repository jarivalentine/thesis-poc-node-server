import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async register(req: Request, res: Response) {
    const { name, password } = req.body;

    try {
      await UserService.register(name, password);
      res.status(201);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { name, password } = req.body;

    try {
      const token = await UserService.login(name, password);
      res.status(200).json(token);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

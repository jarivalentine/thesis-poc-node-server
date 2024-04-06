import TaskService from "../services/taskService";

export default class TaskController {
  static async getAll(req: any, res: any) {
    try {
      const { name } = req.params;

      const tasks = await TaskService.getAll(name);

      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

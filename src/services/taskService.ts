import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class TaskService {
  static async create(title: string, status: string, workspacename: string) {
    try {
      const task = await prisma.task.create({
        data: {
          title,
          status,
          board: {
            connect: {
              name: workspacename,
            },
          },
        },
      });

      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getAll(workspacename: string) {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          board: {
            name: workspacename,
          },
        },
      });

      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async update(taskId: number, status: string, workspacename: string) {
    try {
      const task = await prisma.task.update({
        where: {
          id: taskId,
          board: {
            name: workspacename,
          },
        },
        data: {
          status,
        },
      });

      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

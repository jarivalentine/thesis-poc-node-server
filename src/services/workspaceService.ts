import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class WorkspaceService {
  static async list(user: any) {
    try {
      const workspaces = await prisma.workspace.findMany({
        where: {
          users: {
            some: {
              name: user.name,
            },
          },
        },
      });

      return workspaces;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async create(name: string, user: any) {
    try {
      await prisma.workspace.create({
        data: {
          name,
          users: {
            connect: { name: user.name },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async invite(name: string, userName: string, user: any) {
    try {
      const workspace = await prisma.workspace.findFirst({
        where: {
          name,
          users: {
            some: {
              name: user.name,
            },
          },
        },
      });

      if (!workspace) {
        throw new Error("Workspace not found");
      }

      await prisma.workspace.update({
        where: {
          name,
        },
        data: {
          users: {
            connect: { name: userName },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

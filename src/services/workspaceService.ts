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

  static async get(name: string, user: any) {
    try {
      const workspace = await prisma.workspace.findFirst({
        where: {
          name,
        },
        include: {
          users: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!workspace) {
        throw new Error("Workspace not found");
      }

      return workspace;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async create(name: string, user: any) {
    try {
      const workspace = await prisma.workspace.findFirst({
        where: {
          name,
        },
      });
      if (workspace) {
        throw new Error("Workspace already exists");
      }

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

  static async invite(name: string, username: string, user: any) {
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

      const invitedUser = await prisma.user.findFirst({
        where: {
          name: username,
        },
      });

      if (!invitedUser) {
        throw new Error("User not found");
      }

      await prisma.workspace.update({
        where: {
          name,
        },
        data: {
          users: {
            connect: { name: username },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

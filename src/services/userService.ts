import { PrismaClient } from "@prisma/client";
import { generateToken } from "../middleware/authMiddleware";
import { hash, compare } from "bcrypt";

const prisma = new PrismaClient();

export class UserService {
  static async register(name: string, password: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          name,
        },
      });
      if (user) {
        throw new Error("User already exists");
      }

      const hashedPassword: string = await hash(password, 10);
      await prisma.user.create({
        data: {
          name,
          password: hashedPassword,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async login(name: string, password: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          name,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = generateToken(name);

      return token;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

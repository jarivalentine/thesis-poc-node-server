import { Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
  user?: {
    name: string;
    password: string;
  };
}

export default async (req: AuthenticatedRequest, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  let data;
  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

    data = jsonwebtoken.verify(token, jwtSecret) as JwtPayload;
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }

  const user = await prisma.user.findUnique({
    where: {
      name: data.name,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  req.user = user;

  next();
};

export const generateToken = (name: string) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

  return jsonwebtoken.sign({ name }, jwtSecret);
};

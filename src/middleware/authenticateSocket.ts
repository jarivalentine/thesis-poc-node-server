import { Socket } from "socket.io";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedSocket extends Socket {
  username: string;
}

export const authenticateSocket = async (socket: Socket, next: any) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error("No token provided");

    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) throw new Error("JWT_SECRET not set");

    const user = jsonwebtoken.verify(token, jwtSecret) as JwtPayload;
    if (!user) throw new Error("User not found in token");

    (socket as AuthenticatedSocket).username = user.name;
    next();
  } catch (error: any) {
    next(error);
  }
};

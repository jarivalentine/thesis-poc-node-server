import { Server } from "socket.io";
import { AuthenticatedSocket } from "../middleware/authenticateSocket";

export const cursorHandler = (socket: AuthenticatedSocket, io: Server) => {
  socket.on("mousePosition", (data) => {
    try {
      const { username, position, room } = data;

      io.to(room).emit("mousePosition", { username, position });
    } catch (error: any) {
      socket.emit("cursorError", { error: error.message });
    }
  });
};

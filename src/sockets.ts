import { Server, Socket } from "socket.io";
import { createTaskHandler, updateTaskHandler } from "./handlers/taskHandler";
import { AuthenticatedSocket } from "./middleware/authenticateSocket";
import { cursorHandler } from "./handlers/cursorHandler";

export default function eventHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    const { workspace, type } = socket.handshake.query;
    const room = type ? `${workspace}-${type}` : workspace;
    socket.join(room as string);
    console.log(`Client connected to workspace: ${room}`);

    createTaskHandler(socket as AuthenticatedSocket, io);
    updateTaskHandler(socket as AuthenticatedSocket, io);

    cursorHandler(socket as AuthenticatedSocket, io);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

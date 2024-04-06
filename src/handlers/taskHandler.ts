import { Server } from "socket.io";
import TaskService from "../services/taskService";
import { AuthenticatedSocket } from "../middleware/authenticateSocket";

export const createTaskHandler = async (
  socket: AuthenticatedSocket,
  io: Server
) => {
  socket.on("createTask", async (data) => {
    try {
      const { title, status, workspace } = data;

      const task = await TaskService.create(title, status, workspace);

      io.to(workspace).emit("taskCreated", task);
    } catch (error: any) {
      socket.emit("taskError", { error: error.message });
    }
  });
};

export const updateTaskHandler = async (
  socket: AuthenticatedSocket,
  io: Server
) => {
  socket.on("updateTask", async (data) => {
    try {
      const { taskId, status, workspace } = data;

      const task = await TaskService.update(taskId, status, workspace);

      io.to(workspace).emit("taskUpdated", task);
    } catch (error: any) {
      socket.emit("taskError", { error: error.message });
    }
  });
};

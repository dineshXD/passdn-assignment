import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT || 3000;
const LOCALDB = process.env.DATABASE_LOCAL as string;
import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
const httpServer = new HttpServer(app);
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});
httpServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});

mongoose.connect(LOCALDB).then(() => {
  console.log("Db successfully connected");
});
app.listen(port, () => {
  console.log("server running on port", port);
});

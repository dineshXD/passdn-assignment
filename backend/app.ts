import express, { Request, Response } from "express";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import cors from "cors";
import { restaurantRouter } from "./routes/restaurantRoute";
import { orderRouter } from "./routes/orderRoute";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4000"],
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/orders", orderRouter);
export default app;

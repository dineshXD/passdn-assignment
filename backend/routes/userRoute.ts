import express from "express";
import { restrictTo } from "../controllers/authController";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";
const userRouter = express.Router();
userRouter.use(restrictTo("admin"));
userRouter.get("/", getAllUsers);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;

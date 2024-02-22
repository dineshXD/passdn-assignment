import express, { Request, Response } from "express";
import {
  AuthenticatedRequest,
  createProfile,
  isLoggedIn,
  login,
  logout,
  signup,
} from "../controllers/authController";
export const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get(
  "/check-user",
  isLoggedIn,
  (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({
      status: "success",
      isLoggedIn: true,
      user: req.user,
    });
  }
);
authRouter.post("/create-profile", isLoggedIn, createProfile);
export default authRouter;

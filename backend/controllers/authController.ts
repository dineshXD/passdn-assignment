import mongoose, { MongooseError } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { User, UserDocument, UserProfile } from "../models/userModel";
import bcrypt from "bcryptjs";
import { promisify } from "util";
import { MongoError } from "mongodb";
// Define a custom interface that extends Request
export interface AuthenticatedRequest extends Request {
  user?: any; // Add the user property with the appropriate type
}
const signToken = (id: mongoose.Schema.Types.ObjectId) => {
  return sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user: any, statusCode: number, res: Response) => {
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }
  const token = signToken(user?._id);
  const expiryString = (process.env.JWT_COOKIE_EXPIRES_IN as string) || "90";
  const expiry = parseInt(expiryString, 10);
  const cookieOptions: {
    expires: Date;
    httpOnly: boolean;
    path: string;
    secure: boolean;
    sameSite: "none" | "strict" | "lax" | boolean; // Explicit type annotation
  } = {
    expires: new Date(Date.now() + expiry * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "lax",
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  }
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
export const signup = async (req: Request, res: Response) => {
  if (req.body.role === "admin") {
    req.body.role = "customer";
  }
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    });
    createSendToken(newUser, 201, res);
  } catch (error) {
    if ((error as MongoError).code === 11000) {
      return res.status(400).json({
        status: "failed",
        message: "user already exist",
      });
    } else {
      console.log("error in signup", error);
      return res.status(400).json({
        status: "failed",
        message: "failed to create new user",
        err: error,
      });
    }
  }
};
export const createProfile = async (req: Request, res: Response) => {
  const userProfile = await UserProfile.create({
    name: req.body.name,
    address: req.body.address,
    landmark: req.body.landmark,
    pincode: req.body.pincode,
    contactNumber: req.body.contactNumber,
    userId: req.body.userId,
  });
  const updateUserDetail = await User.findByIdAndUpdate(
    req.body.userId,
    { $addToSet: { profile: userProfile } },
    { new: true } // Return the updated document
  );

  if (!updateUserDetail) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }

  res.status(201).json({
    status: "success",
    message: "User profile created successfully",
    userProfile,
  });
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect email and password",
      });
    }
    createSendToken(user, 200, res);
  } catch (error) {
    console.log("error at log in ", error);
    return res.status(500).json({
      status: "success",
      message: "Login failed. Please try again after sometime",
    });
  }
};
export const isLoggedIn = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookie } = req.headers;
    if (!cookie) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized access! Please login again",
      });
    }
    const token = cookie.split("jwt=")[1];
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid JWT token",
      });
    }
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded || !decoded?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid token",
      });
    }
    const currentUser: UserDocument = (await User.findById(
      decoded.id
    )) as UserDocument;
    if (!currentUser) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Error in isLoggedIn function:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    const cookieOptions = {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    };
    if (process.env.NODE_ENV === "production") {
      const updatedCookieOptions = {
        ...cookieOptions,
        secure: true,
      };
      res.cookie("jwt", "none", updatedCookieOptions);
      res.status(200).json({ success: true });
    }
    res.cookie("jwt", "none", cookieOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("log out error", error);
    return res.status(400).json({
      status: "success",
      message: "Failed to logout user",
    });
  }
};
export const restrictTo = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return res.status(403).json({
        status: "Failed",
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
};
const comparePassword = async (paramPassword: string, userPassword: string) => {
  return await bcrypt.compare(paramPassword, userPassword);
};

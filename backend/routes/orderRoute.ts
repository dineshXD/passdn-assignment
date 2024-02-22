import express from "express";
import authRouter from "./authRoute";
import { isLoggedIn, restrictTo } from "../controllers/authController";
import {
  getRestaurantOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/orderController";
export const orderRouter = express.Router();
authRouter.use(isLoggedIn);
orderRouter.post("/place-order", placeOrder);
orderRouter.get("/:userId", getUserOrders);
orderRouter.get("/restaurant/:restaurantId", getRestaurantOrders);
// authRouter.use(restrictTo("restaurantOwner"));
orderRouter.patch("/updateOrderStatus", updateOrderStatus);

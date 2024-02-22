import Order from "../models/orderSchema";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Restaurant } from "../models/resturantModel";
import { Server as SocketIOServer } from "socket.io";
import { io } from "../server";
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, restaurantId, items, totalPrice } = req.body;
    if (!userId || !restaurantId || !items || !totalPrice) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter all the fields",
      });
    }
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "user not found",
      });
    }
    const restaurant = await Restaurant.findById(req.body.restaurantId);
    if (!restaurant) {
      return res.status(400).json({
        status: "Failed",
        message: "Restaurant not found",
      });
    }
    const order = await Order.create({
      userId,
      restaurantId,
      items,
      totalPrice,
    });
    res.status(201).json({
      status: "success",
      message: "order placed successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to place order",
      error: error,
    });
  }
};
export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      restaurantId: req.params.restaurantId,
    }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(400).json({
        status: "failed",
        message: "order not found",
      });
    }
    res.status(200).json({
      status: "success",
      results: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "user not found",
      });
    }
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    if (!orders) {
      return res.status(400).json({
        status: "failed",
        message: "order not found",
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Emit an event to update the status on the client side
    io.emit("statusUpdated", { orderId, status });
    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

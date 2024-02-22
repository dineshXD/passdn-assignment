import express from "express";
import {
  addFoodItemDetails,
  addRestaurantDetails,
  getAllRestaurant,
  getRestaurantById,
} from "../controllers/restaurantController";
import { placeOrder } from "../controllers/orderController";
export const restaurantRouter = express.Router();
restaurantRouter.get("/", getAllRestaurant);
restaurantRouter.get("/:id", getRestaurantById);
restaurantRouter.post("/", addRestaurantDetails);
restaurantRouter.post("/add-food-item", addFoodItemDetails);
// restaurantRouter.post("/place-order", placeOrder);

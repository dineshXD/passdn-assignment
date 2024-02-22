import mongoose from "mongoose";

// Define the order schema
// const orderSchema = new mongoose.Schema({
//   // Other fields in the order schema (e.g., items, total, user, etc.)
//   // ...
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   products: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//   ],
//   total: { type: Number, required: true },
//   // State of the order
//   status: {
//     type: String,
//     enum: [
//       "pending",
//       "confirmed",
//       "preparing",
//       "packed",
//       "outForDelivery",
//       "delivered",
//       "cancelled",
//     ],
//     default: "pending",
//   },
// });
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who placed the order
    required: [true, "User id required"],
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // Reference to the restaurant where the order was placed
    required: [true, "Restaurant id required"],
  },
  items: [
    {
      // foodItem: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "FoodItems", // Reference to the food item ordered
      //   required: true,
      // },
      quantity: {
        type: Number,
        required: true,
      },
      foodPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "In Progress", "Delivered", "Cancelled"],
    default: "Pending",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the Order model
const Order = mongoose.model("Order", orderSchema);
export default Order;
// Review schema
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String },
  // Add other fields as needed (e.g., timestamp, images, etc.)
});

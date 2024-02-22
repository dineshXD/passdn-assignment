import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who owns the cart
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // Reference to the product in the cart
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);

import mongoose, { mongo } from "mongoose";
const foodItemSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: [true, "please give food name"],
  },
  foodPrice: {
    type: Number,
    required: [true, "Please specify food price"],
  },
  foodDetails: {
    type: String,
    // required: [true, "Please give detail about food"],
    maxLength: 1000,
  },
});
const restaurantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide user id"],
  },
  name: {
    type: String,
    required: [true, "Please enter restaurant name"],
  },
  foodCategory: {
    type: String,
    // enum: ["Pizza", "Chinese", "Italian", "Mexican", "Indian"],
    required: [true, "Please enter your food category"],
  },
  address: {
    type: String,
    required: [true, "Please enter restaurant location"],
  },
  // rating: {
  //   type: Number,
  //   required: [true, "Please enter restaurant rating"],
  //   default: 0,
  // },
  contactNumber: {
    type: Number,
    required: [true, "Please enter valid contact number"],
    validator: function (v: string) {
      return /^\d{10}$/.test(v); // Check if it's exactly 10 digits
    },
    message: "please enter valid 10-digit phone number!",
  },
  // If foodItems is an array of embedded documents (sub-documents) within the Restaurant schema,
  // rather than references to FoodItems documents, then you won't be able to use populate() directly to retrieve the embedded documents.
  foodItems: [foodItemSchema],
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const FoodItems = mongoose.model("FoodItems", foodItemSchema);
export { Restaurant, FoodItems };
// const restaurant = new Restaurant({
//     name: 'Pizza Hut',
//     address: '123 Main Street',
//     foodCategory: 'Pizza',
//     rating: 4.5,
//     contactNumber: '123-456-7890',
//     products: [
//       { name: 'Margherita Pizza', price: 10.99, details: 'Classic tomato and cheese pizza' },
//       { name: 'Pepperoni Pizza', price: 12.99, details: 'Topped with pepperoni slices' }
//     ]
//   });

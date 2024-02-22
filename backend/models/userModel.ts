import mongoose, { mongo } from "mongoose";
import { Document } from "mongoose";
import bcrypt from "bcryptjs";
// Generate interface from Mongoose Document type
export interface UserDocument extends Document {
  // Define user properties here (same as in the schema)
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "restauranttOwner" | "customer"; // Define enum values as a union type
  // Other properties...
}
const profileSchmea = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Users",
  //   required: [true, "Please log in"],
  // },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  address: {
    type: String,
    required: [true, "Please enter valid address"],
  },
  landmark: {
    type: String,
    required: [true, "Please enter landmark"],
  },
  pincode: {
    type: Number,
    required: [true, "Please enter valid pincode"],
    //min greater then or equal to
    min: [100000, "Please enter a valid 6-digit pincode"], // Minimum 6 digits
    //max less than or equal to
    max: [9999999, "Please enter a valid 6-digit pincode"], // Maximum 7 digits
  },
  contactNumber: {
    type: Number,
    required: [true, "Please enter valid contact number"],
    validator: function (v: string) {
      return /^\d{10}$/.test(v); // Check if it's exactly 10 digits
    },
    message: "please enter valid 10-digit phone number!",
  },
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter valid email id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter valid password"],
    minLength: 8,
    maxLength: 16,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirm password"],
    select: false,
    validate: {
      validator: function (el: string): boolean {
        return el === (this as any).password;
      },
      message: "Please enter same as password",
    },
  },
  role: {
    type: String,
    enum: ["customer", "restaurantOwner"],
    default: "customer",
  },
  profile: [profileSchmea],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  (this as any).confirmPassword = undefined;
  next();
});
const User = mongoose.model("Users", userSchema);
const UserProfile = mongoose.model("Profile", profileSchmea);
export { User, UserProfile };

import { Request, Response } from "express";
import { FoodItems, Restaurant } from "../models/resturantModel";
import { User } from "../models/userModel";

export const getAllRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({});
    if (restaurants.length <= 0) {
      return res.status(404).json({
        status: "failed",
        message: "No restaurant found",
      });
    }
    res.status(200).json({
      status: "success",
      results: restaurants.length,
      data: {
        restaurants,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to find restaurant",
      error: error,
    });
  }
};
export const getRestaurantById = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findById(req.params.id).populate(
    "foodItems"
  );
  if (!restaurant) {
    return res.status(404).json({
      status: "failed",
      message: "No restaurant found",
    });
  }
  res.status(200).json({
    status: "success",
    restaurant,
  });
};
export const getFoodItemsById = async (req: Request, res: Response) => {
  //   const foodItemsByRestaurantId = await Product.find({
  //     restaurantId: req.params.restaurantId,
  //   });
};
export const addRestaurantDetails = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.name ||
      !req.body.foodCategory ||
      !req.body.address ||
      !req.body.contactNumber ||
      !req.body.userId
    ) {
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
    if (user.role != "restaurantOwner") {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized access",
      });
    }
    const restaurant = await Restaurant.create({
      name: req.body.name,
      foodCategory: req.body.foodCategory,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      userId: req.body.userId,
    });
    res.status(201).json({
      status: "success",
      message: "Restaurant details added successfully",
      restaurant,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to add restaurant",
      error: error,
    });
  }
};
export const addFoodItemDetails = async (req: Request, res: Response) => {
  try {
    if (!req.body.foodName || !req.body.foodPrice || !req.body.restaurantId) {
      return res.status(400).json({
        status: "Failed",
        message: "Please add all the fields",
      });
    }
    // Create a new product associated with the new restaurant
    const foodItem = await FoodItems.create({
      foodName: req.body.foodName,
      foodPrice: req.body.foodPrice,
      foodDetails: req.body.foodDetails,
      restaurantId: req.body.restaurantId,
    });

    // // Update the restaurant to include the added product
    // await Restaurant.findByIdAndUpdate(req.body.restaurantId, {
    //   $addToSet: { foodItems: foodItem._id },
    // });
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.body.restaurantId,
      { $addToSet: { foodItems: foodItem } },
      { new: true } // Return the updated document
    );

    if (!updatedRestaurant) {
      return res.status(404).json({
        status: "failed",
        message: "Restaurant not found",
      });
    }

    res.status(201).json({
      status: "success",
      message: "Food item added successfully",
      foodItem,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to add new food item",
      error: error,
    });
  }
};

// Create a new restaurant
// const newRestaurant = await Restaurant.create({
//     name: req.body.name,
//     foodCategory: req.body.foodCategory,
//     address: req.body.address,
//     contactNumber: req.body.contactNumber,
//   });

//   // Assuming req.body.products contains an array of products
//   // Add products to the newly created restaurant
//   const products = req.body.products;
//   const productIds = [];
//   for (const product of products) {
//     const newProduct = await Product.create({
//       ...product,
//       restaurant: newRestaurant._id, // Assign the product to the new restaurant
//     });
//     productIds.push(newProduct._id);
//   }

//   // Update the restaurant to include the added products
//   await Restaurant.findByIdAndUpdate(newRestaurant._id, {
//     $addToSet: { products: productIds }, // Add the newly created product IDs to the restaurant's products array
//   });

//   res.status(201).json({
//     status: "success",
//     message: "Restaurant and products added successfully",
//     restaurant: newRestaurant,
//   });

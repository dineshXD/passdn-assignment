import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import { Signup } from "./auth/Signup";
import App from "./App";
import { PartnerSignup } from "./auth/PartnerSignup";
import { Restaurant } from "./restaurant-owner/Restaurant";
import { AddRestaurantDetails } from "./restaurant-owner/AddRestaurantDetail";
import { AddProductDetails } from "./restaurant-owner/AddProductDetails";
import { Nav } from "./navigation/Nav";
import { RestaurantDetailPage } from "./HomePage/RestaurantDetailPage";
import { HomePage } from "./HomePage/HomePage";
import Cart from "./order-manage/Cart";
import { CreateProfile } from "./auth/CreateProfile";
import { Orders } from "./order-manage/Orders";
import { RestaurantOrders } from "./order-manage/RestaurantOrder";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/create-profile",
  //   element: <CreateProfile />,
  // },
  {
    path: "/signup-partner",
    element: <PartnerSignup />,
  },
  {
    path: "/orders",
    children: [
      { index: true, element: <Orders /> },
      { path: ":id", element: <RestaurantOrders /> },
    ],
  },

  {
    path: "/restaurant",
    element: <Restaurant />,
    children: [
      { index: true, element: <Restaurant /> },
      { path: "add-restaurant-details", element: <AddRestaurantDetails /> },
      { path: "add-food-item", element: <AddProductDetails /> },
    ],
  },
  {
    element: <Nav />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "restaurant-detail/:id", element: <RestaurantDetailPage /> },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

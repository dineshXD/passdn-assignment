import { Outlet } from "react-router-dom";
import { Nav } from "../navigation/Nav";

export const Restaurant = () => {
  return (
    <>
      <Nav nav1="Add Restaurant Detail" nav2="Add Food Item"></Nav>
      <Outlet />
    </>
  );
};

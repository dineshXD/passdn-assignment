import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Nav } from "./navigation/Nav";
import { useDispatch, useSelector } from "react-redux";
import { HomePage } from "./HomePage/HomePage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav nav1="Search" nav2="Cart"></Nav>
      <HomePage />
      <Outlet />
    </>
  );
}

export default App;

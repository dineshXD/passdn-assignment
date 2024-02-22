import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { router } from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store.js";
import { AuthProvider } from "./auth/AuthProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider> */}
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

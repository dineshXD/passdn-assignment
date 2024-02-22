import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/check-user",
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.status === "success" && response.data.isLoggedIn) {
          // setIsAuthenticated(true);
          setIsAuthenticated(true, () => {
            navigate("/", { replace: true });
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

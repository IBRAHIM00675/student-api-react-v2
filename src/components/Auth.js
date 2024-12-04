import React, { createContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory(); // useHistory is valid in React Router v5

  const login = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      const token = response.data.accessToken;
      if (typeof token === "string") {
        setIsAuthenticated(true);
        sessionStorage.setItem("accessToken", token); // Save token
        onSuccess(); // Call success callback, like navigation
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed: An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const logout = (history) => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("accessToken");
    history.push("/"); // `history.push` is valid in React Router v5
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin" && password === "admin") {
            resolve();
            setIsAuthenticated(true);
            setLoading(false);
          } else {
            reject(new Error("Invalid username or password"));
            setLoading(false);
          }
        }, 3000);
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

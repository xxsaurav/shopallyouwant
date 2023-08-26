import React, { createContext, useState } from "react";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const contextValue = {
    loading,
    setLoading,
    user,
    setUser,
    error,
    setError,
    isAuthenticated,
    setIsAuthenticated,
    
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

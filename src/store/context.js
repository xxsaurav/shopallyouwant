import React, { createContext, useState } from "react";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const [resultPerPage, setResultPerPage] = useState([]);
  const [filteredProductsCount, setfilteredProductsCount] = useState([]);

  const contextValue = {
    loading,
    setLoading,
    user,
    setUser,
    products,
    setProducts,
    error,
    setError,
    isAuthenticated,
    setIsAuthenticated,
    cartItems,
    setCartItems,
    productsCount,
    setProductsCount,
    resultPerPage,
    setResultPerPage,
    filteredProductsCount,
    setfilteredProductsCount,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

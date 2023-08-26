import React, { createContext, useState } from "react";

const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [productsCount, setProductsCount] = useState([]);
  const [resultPerPage, setResultPerPage] = useState([]);
  const [filteredProductsCount, setfilteredProductsCount] = useState([]);

  const contextValue = {
    loading,
    setLoading,
    products,
    setProducts,
    error,
    setError,
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
    <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };

import React, { useState, useEffect, useContext } from "react";
import Loader from "../layout/Loader/Loader";
import { ProductContext } from "../../store/productContext";
import MetaData from "../layout/MetaData";
import "./Products.css";
import Product from "./Product";
import { getProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
const categories = JSON.parse(process.env.REACT_APP_CATEGORIES);

const Products = ({ match }) => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const alert = useAlert();
  const {
    loading,
    products,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    setLoading,
    setProducts,
    setProductsCount,
    setResultPerPage,
    setFilteredProductsCount,
    setError,
  } = useContext(ProductContext);
  console.log(match,keyword,products);
  // const keyword = match.params.keyword;
  useEffect(() => {
    if (error) {
      alert.error(error);
      setError(null);
    }
  }, [alert, error]);
  useEffect(() => {
    getProducts(
      keyword,
      currentPage,
      price,
      category,
      ratings,
      setLoading,
      setProducts,
      setProductsCount,
      setResultPerPage,
      setFilteredProductsCount,
      setError
    );
  }, [keyword, currentPage, price, category, ratings]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products buy ecommerce online shopping" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Products;

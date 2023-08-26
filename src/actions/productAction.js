import axios from "axios";
const apiURL = process.env.REACT_APP_BASE_URL;
export const getProducts = async (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0,
  setLoading,
  setProducts,
  setProductsCount,
  setResultPerPage,
  setFilteredProductsCount,
  setError
) => {
  try {
    const { data } = await axios.get(
      `${apiURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${
        price[0]
      }&price[lte]=${price[1]}&ratings[gte]=${ratings}${
        category ? "&category=" + category : ""
      }`
    );
    setLoading(false);
    setProducts(data.products);
    setProductsCount(data.productsCount);
    setResultPerPage(data.resultPerPage);
    setFilteredProductsCount(data.filteredProductsCount);
  } catch (error) {
    console.log(error?.response?.data?.message);
    setError(error?.response?.data?.message);
  }
};

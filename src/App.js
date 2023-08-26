import "./App.css";
import { useEffect, useState, useContext } from "react";
import NavBar from "./component/layout/Header/Header.js";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import React from "react";
import ProtectedRoute from "./Route/ProtectedRoute";
import Home from "./component/Home/Home.js";
import LoginSignUp from "./component/User/LoginSignup";
import Profile from "./component/User/Profile";
import { UserContext } from "./store/userContext";
import { ProductContextProvider } from "./store/productContext";
import UserOption from "./component/layout/Header/UserOption";
import { loadUser } from "./actions/userAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NotFound from "./component/layout/Not Found/NotFound";
import Footer from "./component/layout/Footer/Footer";
import Products from "./component/Product/Products";
// import Search from "./component/Product/Search";
// import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
// import NotFound from "./component/layout/Not Found/NotFound";
function App() {
  const {
    user,
    loading,
    isAuthenticated,
    setLoading,
    setIsAuthenticated,
    setUser,
    setError,
  } = useContext(UserContext);

  // const {} =useContext(ProductContext)
  const [stripeApiKey, setStripeApiKey] = useState("");
  const apiURL = process.env.REACT_APP_BASE_URL;
  // .toString();
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(apiURL + "/api/v1/stripeapikey");

      setStripeApiKey(data.stripeApiKey);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    loadUser(setLoading, setIsAuthenticated, setUser, setError);
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <NavBar />
      <ProductContextProvider>
        {isAuthenticated && <UserOption user={user} />}
      </ProductContextProvider>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route
            exact
            path="/process/payment"
            element={
              <ProtectedRoute>
                <>bulla</>
              </ProtectedRoute>
            }
          />
        </Elements>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/products" element={<ProductContextProvider><Products /> </ProductContextProvider>} />
        {/* <ProductContextProvider>
          <Route exact path="/products" element={<Products />} />
        </ProductContextProvider> */}

        {/*

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} /> */}
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

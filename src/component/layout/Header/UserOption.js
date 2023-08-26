import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../../../store/userContext";
import { ProductContext } from "../../../store/productContext";
import { logout } from "../../../actions/userAction";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import {
  Dashboard,
  ExitToApp,
  ListAlt,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { useAlert } from "react-alert";

const UserOption = ({ user }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setLoading, setIsAuthenticated, setUser, setError } =
    useContext(UserContext);
  const { cartItems, } =
    useContext(ProductContext);
  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: "Logout", func: logoutt },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
    function dashboard() {
      navigate("/admin/dashboard");
    }
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutt() {
    // navigate("/logout");
    logout(setLoading, setIsAuthenticated, setUser, setError);
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOption;

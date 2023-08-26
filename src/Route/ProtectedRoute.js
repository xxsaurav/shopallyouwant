import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "../store/userContext";

const ProtectedRoute = ({ isAdmin, children }) => {
  console.log(isAdmin, children);
  const { loading, isAuthenticated, user } = useContext(UserContext);

  return (
    <>
      {loading === false &&
        // <Route
        //   {...rest}
        //   element={(props) => {
        (isAuthenticated === false ? (
          <Navigate to="/login" />
        ) : isAdmin === true && user.role !== "admin" ? (
          <Navigate to="/login" />
        ) : (
          children
        ))}
    </>
  );
};

export default ProtectedRoute;

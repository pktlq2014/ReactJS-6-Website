import { Toast } from "bootstrap";
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  var temp = 0;
  return (
    <Route
      {...rest}
      component={(props) => {
        const dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
        if (dataLogin) {
          return <Component {...props} />;
        } else {
          alert('You need to signin first to use this function!!!');
          return <Redirect to={`/cart`} />;
        }
      }}
    />
  );
};
export default PrivateRoute;

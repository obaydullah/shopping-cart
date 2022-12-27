import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRegister = () => {
  const { loggedIn } = useSelector((state) => state.login);

  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRegister;

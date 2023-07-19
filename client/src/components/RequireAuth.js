import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Loader from "./Loader";

const RequireAuth = () => {
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const getAuth = async (token) => {
  //     if (token) {
  //       try {
  //         const _id = localStorage.getItem("_id");
  //         const response = await axios.get(
  //           process.env.REACT_APP_SURVIVOR_API + _id,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               token,
  //             },
  //           }
  //         );
  //         setAuth(response.data.survivor);
  //       } catch (error) {}
  //     }
  //     setIsAuthenticating(false);
  //   };
  //   if (!auth?.username) {
  //     getAuth(localStorage.getItem("token"));
  //   } else {
  //     setIsAuthenticating(false);
  //   }
  // }, [setAuth, auth]);

  // if (isAuthenticating) {
  //   return <Loader />;
  // }
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;

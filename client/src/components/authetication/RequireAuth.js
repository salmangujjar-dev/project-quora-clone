import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { getUser } from "../../redux/actions/authActions";
import Loader from "../utils/Loader";

const RequireAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(!isLoggedIn);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async (token) => {
      const _id = localStorage.getItem("_id");
      await dispatch(getUser({ _id, token })).then(() => {
        setIsAuthenticated(false);
      });
    };

    const token = localStorage.getItem("token");
    !isLoggedIn && token && fetchUser(token);
  }, [dispatch, isLoggedIn]);

  return isAuthenticated ? (
    <Loader />
  ) : isLoggedIn ? (
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

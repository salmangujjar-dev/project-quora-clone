import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getUser } from "../../redux/actions/authActions";
import Loader from "../utils/Loader";

const RequireAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = (token) => {
      const _id = localStorage.getItem("_id");

      dispatch(getUser({ _id, token })).then(() => setIsAuthenticated(false));
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

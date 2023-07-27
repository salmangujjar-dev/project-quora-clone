import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/authetication/Login";
import Signup from "./components/authetication/Signup";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const { loading, isLoggedIn, success, errorCause } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    success && setShowLogin(true);
    isLoggedIn && navigate("/home");
    localStorage.getItem("token") && navigate("/home");
  }, [navigate, success, isLoggedIn]);

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        {showLogin ? (
          <Login
            setShowLogin={setShowLogin}
            dispatch={dispatch}
            error={errorCause}
            loading={loading}
          />
        ) : (
          <Signup
            setShowLogin={setShowLogin}
            dispatch={dispatch}
            error={errorCause}
            loading={loading}
          />
        )}
      </Container>
    </>
  );
}

export default App;

import { useEffect } from "react";
import { Button, Toolbar, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/authSlice";
import Navbar from "../components/Navbar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()) && navigate("/");
  };

  useEffect(() => {
    userInfo ?? navigate("/");
  }, []);

  return (
    <div>
      <Navbar />
      <Toolbar />
      <Container>
        <h1>Home</h1>
        <Button
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </div>
  );
}

export default Home;

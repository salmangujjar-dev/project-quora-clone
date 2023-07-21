import { useEffect } from "react";
import { Toolbar, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/header/Navbar";

function Home() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo ?? navigate("/");
  }, [userInfo, navigate]);

  return (
    <div>
      <Navbar />
      <Toolbar />
      <Container>
        <h1>Home</h1>
      </Container>
    </div>
  );
}

export default Home;

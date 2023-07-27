import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stack,
  FormControl,
  Toolbar,
  Container,
  Avatar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../components/header/Navbar";

const Profile = () => {
  const userId = useParams()?._id;

  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [user, setUser] = useState({});
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        process.env.REACT_APP_USER_API + userId,
        {
          headers: {
            token,
          },
        }
      );
      setUser(response.data.userInfo);
      if (response.data.userInfo?.profile_image) {
        setPreviewImage(
          `data:image/*;base64,${response.data.userInfo.profile_image}`
        );
      }
    };

    userId ?? navigate("/");
    typeof userId !== "undefined" && fetchUser();
  }, [userId, navigate, token]);
  return (
    <div>
      <Navbar />
      <Toolbar />
      <Container>
        <FormControl
          sx={{
            minWidth: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Stack
            spacing={2}
            direction="column"
          >
            <Avatar
              alt={user?.name}
              className="mx-auto"
              src={previewImage}
              title={user?.name}
              sx={{
                width: 200,
                height: 200,
              }}
            />
            <Typography
              component="div"
              variant="h6"
              fontWeight="bold"
            >
              {user.name}
            </Typography>
            <Typography
              component="div"
              variant="h6"
            >
              {user.username}
            </Typography>
            <Typography
              component="div"
              variant="h6"
            >
              {user.email}
            </Typography>
            <Typography
              component="div"
              variant="h6"
            >
              {user.age}
            </Typography>
            <Typography
              component="div"
              variant="h6"
            >
              {user.gender}
            </Typography>
          </Stack>
        </FormControl>
        <Box mt={5}>
          <Divider>
            <Typography
              align="center"
              component="div"
              variant="h2"
              fontWeight="bold"
              color="primary"
              letterSpacing={12}
            >
              Questions
            </Typography>
          </Divider>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;

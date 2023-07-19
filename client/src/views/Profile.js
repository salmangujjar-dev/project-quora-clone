import { useState, useRef, useEffect } from "react";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  Toolbar,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  FormLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { updateUser } from "../redux/slices/authSlice";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);

  const username = useRef();
  const email = useRef();
  const name = useRef();
  const age = useRef();

  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.auth);

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById("profilePicture");
    fileInput.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUserInfo = {
        name: name.current.value,
        age: age.current.value,
        username: userInfo?.username,
        email: userInfo?.email,
        gender,
      };
      const data = new FormData();
      data.append("file", image);
      data.append("updatedUserInfo", JSON.stringify(updatedUserInfo));

      const response = await axios.put(
        process.env.REACT_APP_USER_API + userInfo._id,
        data,
        {
          headers: {
            token,
          },
        }
      );

      const { updatedUser } = response.data;
      const updateUserObj = {
        ...updatedUser,
        _id: userInfo._id,
        profile_image:
          updatedUser.profile_image ?? userInfo.profile_image ?? null,
      };

      dispatch(updateUser(updateUserObj));
      setLoading(false);

      toast.info("Profile Updated!");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (userInfo?.profile_image) {
      setPreviewImage(`data:image/*;base64,${userInfo?.profile_image}`);
    }
  }, [userInfo.profile_image]);

  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={2000}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Navbar />
          <Toolbar />
          <Container>
            <form
              className="d-flex justify-content-center"
              onSubmit={handleSubmit}
            >
              <FormControl sx={{ minWidth: 400 }}>
                <Stack
                  spacing={2}
                  direction="column"
                >
                  <Avatar
                    alt={userInfo?.name}
                    className="mx-auto"
                    src={previewImage}
                    title="Upload Image"
                    sx={{
                      width: 200,
                      height: 200,
                      cursor: "pointer",
                      transition: "opacity 0.3s",
                      "&:hover": {
                        opacity: 0.7,
                      },
                    }}
                    onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    id="profilePicture"
                    style={{ display: "none" }}
                    onChange={handleUploadImage}
                  />
                  <TextField
                    label="Name"
                    variant="outlined"
                    name="fullName"
                    type="text"
                    defaultValue={userInfo?.name}
                    inputRef={name}
                    required
                    autoFocus
                  />
                  <TextField
                    label="Username"
                    variant="outlined"
                    name="username"
                    type="text"
                    defaultValue={userInfo?.username}
                    inputRef={username}
                    required
                    autoComplete="on"
                    disabled
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="text"
                    defaultValue={userInfo?.email}
                    inputRef={email}
                    required
                    autoComplete="on"
                    disabled
                  />
                  <TextField
                    label="Age"
                    variant="outlined"
                    name="age"
                    type="number"
                    defaultValue={userInfo?.age}
                    inputRef={age}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                  />
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={userInfo?.gender}
                    name="gender"
                    onChange={handleGenderChange}
                    className="justify-content-around align-items-center"
                    required
                  >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender:
                    </FormLabel>
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Update
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;

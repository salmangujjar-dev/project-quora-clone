import { useState, useRef } from "react";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  InputAdornment,
  Avatar,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

import { registerUser } from "../../redux/actions/authActions";
import Styles from "../../styles/Styles";

const Login = ({ setShowLogin, dispatch, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("Male");
  const [previewImage, setPreviewImage] = useState();

  const username = useRef();
  const name = useRef();
  const age = useRef();
  const password = useRef();
  const email = useRef();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById("profilePicture");
    fileInput.click();
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleShowLogin = () => {
    localStorage.removeItem("persist:root");
    setShowLogin(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      name: name.current.value,
      username: username.current.value,
      age: age.current.value,
      password: password.current.value,
      email: email.current.value,
      gender,
    };

    const data = new FormData();
    data.append("file", image);
    data.append("userInfo", JSON.stringify(userInfo));

    dispatch(registerUser(data));
  };

  return (
    <>
      <LockIcon fontSize="large" />
      <h1 className="mt-3">Sign up Page</h1>
      <form
        className="mt-4"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ minWidth: 400 }}>
          <Stack
            spacing={2}
            direction="column"
          >
            <Avatar
              className="mx-auto"
              src={previewImage}
              title="Upload Image"
              sx={Styles.Avatar}
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
              inputRef={name}
              required
              autoFocus
            />
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              type="text"
              inputRef={username}
              error={error === "username"}
              required
              autoComplete="on"
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              inputRef={email}
              error={error === "email"}
              required
              autoComplete="on"
            />
            <TextField
              label="Age"
              variant="outlined"
              name="age"
              type="number"
              inputRef={age}
              InputProps={{ inputProps: { min: 0 } }}
              required
            />
            <RadioGroup
              row
              defaultValue="Male"
              name="gender"
              onChange={handleGenderChange}
              className="justify-content-around align-items-center"
              required
            >
              <FormLabel>Gender: </FormLabel>
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
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              inputRef={password}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={togglePassword}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                  </InputAdornment>
                ),
              }}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="contained"
            >
              Signup
            </Button>
          </Stack>
        </FormControl>
      </form>
      <Typography
        variant="body1"
        marginTop={3}
      >
        Have an account?{" "}
        <Typography
          component="span"
          variant="body1"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleShowLogin}
        >
          Login
        </Typography>
      </Typography>
    </>
  );
};

export default Login;

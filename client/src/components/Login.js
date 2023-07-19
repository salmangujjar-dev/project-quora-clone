import { useState, useRef } from "react";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

import Spinner from "./Spinner";
import { loginUser } from "../redux/actions/authActions";

const Login = ({ setShowLogin, dispatch, error, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const username = useRef();
  const password = useRef();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowLogin = () => {
    localStorage.removeItem("persist:root");
    setShowLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    dispatch(loginUser(data));
  };

  return (
    <>
      <LockIcon fontSize="large" />
      <h1 className="mt-3">Login Page</h1>
      <form
        className="mt-4"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <Stack
            spacing={2}
            direction="column"
          >
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              type="username"
              inputRef={username}
              error={error === "username"}
              required
              autoFocus
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              inputRef={password}
              error={error === "password"}
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
            />
            {loading ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            )}
          </Stack>
        </FormControl>
      </form>
      <Typography
        variant="body1"
        marginTop={3}
      >
        Don't have an account?{" "}
        <Typography
          component="span"
          variant="body1"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleShowLogin}
        >
          Sign up
        </Typography>
      </Typography>
    </>
  );
};

export default Login;

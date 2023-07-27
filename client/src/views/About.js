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
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/header/Navbar";
import { updateUser } from "../redux/actions/authActions";
import Spinner from "../components/utils/Spinner";
//import QuestionCard from "../components/question/QuestionCard";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const [gender, setGender] = useState("Male");
  // const [questions, setQuestions] = useState([]);

  const username = useRef();
  const email = useRef();
  const name = useRef();
  const age = useRef();

  const dispatch = useDispatch();
  const { userInfo, token, loading } = useSelector((state) => state.auth);

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

    const updatedUserInfo = {
      name: name.current.value,
      age: age.current.value,
      username: userInfo?.username,
      email: userInfo?.email,
      following: userInfo?.following,
      gender,
    };
    const data = new FormData();
    data.append("file", image);
    data.append("updatedUserInfo", JSON.stringify(updatedUserInfo));

    dispatch(updateUser({ data, token, userInfo }));
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
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              )}
            </Stack>
          </FormControl>
        </form>
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
          {/* {questions.map(
            (question, index) =>
              question.relatedTopics.some((question) =>
                userInfo.following.includes(question)
              ) && (
                <QuestionCard
                  key={index}
                  questionId={question._id}
                  questionBody={question.question}
                  author={question.author}
                  date={question.createdAt}
                  reactions={question.reactions}
                  likeCount={question.likeCount}
                  dislikeCount={question.dislikeCount}
                  dispatch={dispatch}
                  userId={userInfo._id}
                  token={token}
                />
              )
          )} */}
        </Box>
      </Container>
    </>
  );
};

export default Profile;

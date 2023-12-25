import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Toolbar,
  Container,
  Stack,
  Pagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/header/Navbar";
import QuestionCard from "../components/question/QuestionCard";
import QuestionModal from "../components/question/QuestionModal";
import { toggleModal } from "../redux/slices/questionSlice";
import { getQuestions } from "../redux/actions/questionActions";
import axios from "axios";

function Home({ compact }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, token } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.questions);
  const [isToggled, setIsToggled] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const handleChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchQuestionsCount = async () => {
      const response = await axios.get(
        process.env.REACT_APP_USER_API +
        userInfo._id +
        "/followed-topics/question-count",
        {
          headers: {
            token,
          },
        }
      );
      setPages(Math.ceil(response.data.questionCount / 10));
    };
    fetchQuestionsCount();
  }, [token, userInfo]);

  useEffect(() => {
    userInfo ?? navigate("/");
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(getQuestions({ _id: userInfo._id, token, currentPage }));
  }, [dispatch, token, currentPage, userInfo, isToggled]);

  return (
    <div>
      {!compact && <Navbar />}
      <Toolbar />
      <Container>
        {!compact && <Box className="d-flex justify-content-center">
          <Button
            variant="contained"
            onClick={() => dispatch(toggleModal())}
          >
            Ask Question
          </Button>
          <QuestionModal dispatch={dispatch} />
        </Box>}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          spacing={2}
          mt={5}
          useFlexGap
        >
          {questions.map(
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
                  isToggled={isToggled}
                  setIsToggled={setIsToggled}
                />
              )
          )}
          <Stack
            mt={3}
            mb={5}
            spacing={2}
          >
            <Pagination
              count={pages}
              color="primary"
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;

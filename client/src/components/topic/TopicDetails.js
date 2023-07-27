import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  Divider,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import QuestionCard from "../question/QuestionCard";

import Styles from "../../styles/Styles";

const TopicDetails = ({ userInfo, topicInfo, dispatch, token }) => {
  const { topicId } = topicInfo;

  const [questions, setQuestions] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const handleChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchPageCount = async () => {
      const response = await axios.get(
        process.env.REACT_APP_TOPIC_API + `${topicId}/question-count`,
        {
          headers: {
            token,
          },
        }
      );
      setPages(Math.ceil(response.data.length / 10));
    };

    fetchPageCount();
  }, [token, topicId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_TOPIC_API + `${topicId}/${currentPage}`,
          {
            headers: {
              token,
            },
          }
        );
        setQuestions(response.data.questions);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchQuestions();
  }, [token, topicId, isToggled, currentPage]);

  return (
    <Box>
      <Stack
        spacing={2}
        justifyContent="center"
      >
        <Avatar
          className="mx-auto"
          src={`data:image/*;base64,${topicInfo?.image}`}
          title="Topic Image"
          sx={Styles.Avatar}
        />
        <Typography
          fontWeight="bold"
          align="center"
          variant="h4"
          component="div"
          gutterBottom
        >
          {topicInfo?.title}
        </Typography>
      </Stack>
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
            question.relatedTopics.includes(topicId) && (
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
    </Box>
  );
};

export default TopicDetails;

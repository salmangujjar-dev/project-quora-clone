import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Toolbar, Button, Stack } from "@mui/material";

import Navbar from "../components/header/Navbar";
import TopicModal from "../components/topic/TopicModal";
import TopicCard from "../components/topic/TopicCard";
import TopicDetails from "../components/topic/TopicDetails";
import { toggleModal } from "../redux/slices/topicSlice";
import { getTopics, getTopicDetails } from "../redux/actions/topicActions";

const Topic = () => {
  const dispatch = useDispatch();

  const { _id } = useParams();
  const { state } = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { topics } = useSelector((state) => state.topics);

  useEffect(() => {
    _id
      ? dispatch(getTopicDetails({ _id, token }))
      : dispatch(getTopics(token));
  }, [dispatch, token, _id]);

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container>
        {_id ? (
          <TopicDetails topicInfo={state} />
        ) : (
          <>
            <Box className="d-flex justify-content-center">
              <Button
                variant="contained"
                onClick={() => dispatch(toggleModal())}
              >
                Add Topic
              </Button>
              <TopicModal dispatch={dispatch} />
            </Box>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              spacing={2}
              mt={5}
              useFlexGap
            >
              {topics.map((topic, index) => (
                <TopicCard
                  key={index}
                  _id={topic._id}
                  title={topic.title}
                  description={topic.description}
                  image={topic.image}
                />
              ))}
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default Topic;

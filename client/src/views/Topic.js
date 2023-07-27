import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Toolbar, Button, Stack } from "@mui/material";

import Navbar from "../components/header/Navbar";
import TopicModal from "../components/topic/TopicModal";
import TopicCard from "../components/topic/TopicCard";
import TopicDetails from "../components/topic/TopicDetails";
import { toggleModal } from "../redux/slices/topicSlice";
import { getTopics } from "../redux/actions/topicActions";

const Topic = () => {
  const dispatch = useDispatch();

  const topicId = useParams()?._id;

  const { state } = useLocation();

  const { userInfo, token, loading } = useSelector((state) => state.auth);
  const { topics } = useSelector((state) => state.topics);

  useEffect(() => {
    topicId ?? dispatch(getTopics(token));
  }, [dispatch, token, topicId]);

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container>
        {topicId ? (
          <TopicDetails
            userInfo={userInfo}
            topicInfo={state}
            dispatch={dispatch}
            token={token}
          />
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
                  dispatch={dispatch}
                  topicId={topic._id}
                  userInfo={userInfo}
                  title={topic.title}
                  description={topic.description}
                  image={topic.image}
                  followers={topic.followers}
                  token={token}
                  loading={loading}
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

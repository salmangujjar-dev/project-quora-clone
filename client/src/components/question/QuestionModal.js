import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Modal,
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";

import { toggleModal } from "../../redux/slices/questionSlice";
import { getTopics } from "../../redux/actions/topicActions";
import { askQuestion } from "../../redux/actions/questionActions";
import Spinner from "../utils/Spinner";

import Styles from "../../styles/Styles";

const QuestionModal = ({ dispatch }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const { topics } = useSelector((state) => state.topics);
  const { token, userInfo } = useSelector((state) => state.auth);
  const { open, loading } = useSelector((state) => state.questions);

  const question = useRef();

  const renderInput = (params) => (
    <TextField
      {...params}
      variant="standard"
      label="Topics"
      placeholder="Related Topics"
      required={selectedTopics.length === 0}
    />
  );

  const handleInputChange = (event, newValue) => {
    const selectedTopicIds = newValue.map((topic) => topic._id);
    setSelectedTopics(selectedTopicIds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      question: question.current.value,
      relatedTopics: selectedTopics,
      author: userInfo._id,
    };
    dispatch(askQuestion({ data, name: userInfo.name, token }));
  };

  useEffect(() => {
    topics.length === 0 && dispatch(getTopics(token));
  }, [dispatch, token, topics]);

  return (
    <Modal
      open={open}
      onClose={() => dispatch(toggleModal())}
      aria-label="Add Question"
    >
      <Box sx={Styles.Modal}>
        {topics.length > 0 ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                component="div"
                variant="h4"
              >
                {"Ask Question?"}
              </Typography>
              <IconButton onClick={() => dispatch(toggleModal())}>
                <CloseIcon />
              </IconButton>
            </Box>
            <form
              mt={2}
              className="d-flex flex-column justify-content-center"
              variant="body1"
              onSubmit={handleSubmit}
            >
              <Stack
                spacing={2}
                mt={3}
                direction="column"
              >
                <TextField
                  label="Question"
                  placeholder="Question?"
                  inputRef={question}
                  inputProps={{ minLength: 10, maxLength: 256 }}
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
                <Autocomplete
                  options={topics}
                  onChange={handleInputChange}
                  getOptionLabel={(option) => option.title}
                  renderInput={renderInput}
                  filterSelectedOptions
                  multiple
                />
                {loading ? (
                  <Spinner />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </form>
          </>
        ) : (
          <Typography
            component="div"
            variant="h2"
          >
            No Topics Available
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default QuestionModal;

import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Modal,
  Box,
  Button,
  TextField,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";

import { createTopic } from "../../redux/actions/topicActions";
import { toggleModal } from "../../redux/slices/topicSlice";
import Spinner from "../utils/Spinner";

import Styles from "../../styles/Styles";

const TopicModal = ({ dispatch }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { loading, errorCause, open } = useSelector((state) => state.topics);
  const { token } = useSelector((state) => state.auth);

  const title = useRef();
  const description = useRef();

  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById("profilePicture");
    fileInput.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const topicInfo = {
      title: title.current.value,
      description: description.current.value,
    };

    const data = new FormData();
    data.append("file", image);
    data.append("topicInfo", JSON.stringify(topicInfo));

    dispatch(createTopic({ data, token }));

    setPreviewImage(null);
  };

  return (
    <Modal
      open={open}
      onClose={() => dispatch(toggleModal())}
      aria-label="Add Topic"
    >
      <Box sx={Styles.Modal}>
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <IconButton
            className="d-flex flex-end"
            onClick={() => dispatch(toggleModal())}
          >
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
            <Avatar
              className="mx-auto"
              src={previewImage}
              title="Upload Topic Image"
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
              label="Title"
              placeholder="Title"
              inputRef={title}
              error={errorCause === "title"}
              fullWidth
              required
            />
            <TextField
              label="Description"
              placeholder="Description"
              inputRef={description}
              inputProps={{ minLength: 10, maxLength: 256 }}
              multiline
              rows={4}
              fullWidth
              required
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
      </Box>
    </Modal>
  );
};

export default TopicModal;

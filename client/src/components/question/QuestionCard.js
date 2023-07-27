import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { performReaction } from "../../redux/actions/questionActions";
import { Link } from "react-router-dom";

const QuestionCard = ({
  questionId,
  questionBody,
  author,
  date,
  reactions,
  likeCount,
  dislikeCount,
  dispatch,
  userId,
  token,
  isToggled,
  setIsToggled,
}) => {
  const reaction = reactions[userId];

  const handleReaction = (updatedReaction) => {
    dispatch(
      performReaction({
        questionId,
        userId,
        updatedReaction,
        prevReaction: reaction,
        token,
        isToggle: reaction === updatedReaction,
      })
    );

    typeof isToggled !== "undefined" && setIsToggled(!isToggled);
  };

  return (
    <Card sx={{ minWidth: "100%" }}>
      <CardContent>
        <Typography
          gutterBottom
          fontWeight="bold"
          variant="h6"
          component="div"
        >
          {questionBody}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {author?.name ? (
              <Link
                to={`/profile/${author?._id}`}
                style={{ textDecoration: "none", color: "grey" }}
              >
                {author.name}
              </Link>
            ) : (
              "Deleted User"
            )}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {new Date(date).toLocaleString()}
          </Typography>
        </Box>
        <Box
          mt={3}
          alignItems="center"
        >
          <IconButton
            color={reaction === "like" ? "primary" : "default"}
            onClick={() => handleReaction("like")}
          >
            <ThumbUpIcon />
          </IconButton>
          {likeCount}
          <IconButton
            color={reaction === "dislike" ? "primary" : "default"}
            onClick={() => handleReaction("dislike")}
          >
            <ThumbDownIcon />
          </IconButton>
          {dislikeCount}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

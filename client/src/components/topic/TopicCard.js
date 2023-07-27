import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { toggleFollowTopic } from "../../redux/actions/authActions";
import { changeInFollowerCount } from "../../redux/slices/topicSlice";
import defaultImage from "../../assets/default.png";
import Spinner from "../utils/Spinner";

const TopicCard = ({
  dispatch,
  topicId,
  userInfo,
  title,
  description,
  image,
  followers,
  token,
  loading,
}) => {
  const navigate = useNavigate();

  const handleTopicDetailNavigation = () => {
    navigate(`/topic/${topicId}`, {
      state: { topicId, title, description, image },
    });
  };

  const isFollowing = userInfo.following.includes(topicId);

  const handleFollowTopic = () => {
    dispatch(
      toggleFollowTopic({
        topicId,
        isToggle: isFollowing,
        userId: userInfo._id,
        token,
      })
    );
    dispatch(
      changeInFollowerCount({
        topicId,
        isToggle: isFollowing,
      })
    );
  };

  return (
    <Card sx={{ minWidth: 345, maxWidth: 345 }}>
      <CardMedia
        onClick={handleTopicDetailNavigation}
        component="img"
        alt={title}
        height="140"
        style={{ objectFit: "contain", cursor: "pointer" }}
        image={image ? `data:image/*;base64,${image}` : defaultImage}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Typography
            gutterBottom
            fontWeight="bold"
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleFollowTopic}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </Box>{" "}
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Followers: {followers}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TopicCard;

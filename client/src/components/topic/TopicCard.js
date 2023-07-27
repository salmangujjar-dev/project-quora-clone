import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import defaultImage from "../../assets/default.png";

const TopicCard = ({ _id, title, description, image }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/topic/${_id}`, {
      state: { _id, title, description, image },
    });
  };

  return (
    <Card
      sx={{ minWidth: 345, maxWidth: 345, cursor: "pointer" }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        alt={title}
        height="140"
        style={{ objectFit: "contain" }}
        image={image ? `data:image/*;base64,${image}` : defaultImage}
      />
      <CardContent>
        <Typography
          gutterBottom
          fontWeight="bold"
          variant="h6"
          component="div"
        >
          {title}
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

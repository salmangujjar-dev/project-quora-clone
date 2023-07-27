import { Avatar, Box, Typography, Stack } from "@mui/material";

import Styles from "../../styles/Styles";

const TopicDetails = ({ topicInfo }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
    >
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
    </Box>
  );
};

export default TopicDetails;

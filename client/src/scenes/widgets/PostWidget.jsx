import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Grid,
  InputBase,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  audioPath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);
  const [comment, setComment] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const commentCount = Object.keys(comments).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = "rgb(249, 98, 123)";

  const patchLike = async () => {
    const response = await fetch(
      `https://donut-v0i4.onrender.com/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const addComment = async () => {
    if (comment != "" && comment != null) {
      const response = await fetch(
        `https://donut-v0i4.onrender.com/posts/${postId}/comment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId, comment: comment }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setComment(null);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://donut-v0i4.onrender.com/assets/${picturePath}`}
        />
      )}
      {audioPath && (
        <Box mt="4px">
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <AudiotrackIcon />
            </Grid>
            <Grid item>
              <Typography
                sx={{ color: main, mt: "4px", mb: "4px", fontSize: "1rem" }}
              >
                {audioPath.substring(0, audioPath.length - 4)}
              </Typography>
            </Grid>
          </Grid>

          <audio controls>
            <source
              src={`https://donut-v0i4.onrender.com/assets/${audioPath}`}
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComments(!isComments);
                setIsAddComment(false);
              }}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{commentCount}</Typography>
            {isComments && (
              <AddCircleOutlineSharpIcon
                sx={{ marginLeft: "1rem", "&:hover": { cursor: "pointer" } }}
                onClick={() => setIsAddComment(!isAddComment)}
              />
            )}
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isAddComment && (
        <Box mt="0.5rem">
          <Divider />
          <Typography
            sx={{
              color: main,
              m: "0.5rem 0",
              pl: "1rem",
            }}
          >
            <Box alignItems="center" display="flex">
              <InputBase
                placeholder="Comment here..."
                onChange={(e) => setComment(e.target.value)}
              />
              <CheckCircleIcon
                onClick={() => {
                  addComment();
                  setIsAddComment(false);
                }}
                sx={{
                  "&:hover": { cursor: "pointer" },
                  alignContent: "center",
                  mt: "2px",
                }}
              />
            </Box>
          </Typography>
        </Box>
      )}

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

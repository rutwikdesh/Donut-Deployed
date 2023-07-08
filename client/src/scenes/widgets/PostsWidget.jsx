import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false, searchQuery }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const getPosts = async () => {
    const response = await fetch("https://donut-v0i4.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://donut-v0i4.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }

    // Filter by Query
    if (searchQuery) {
      var updatedPosts = [...posts];
      var filteredPostsNew = [];
      console.log(updatedPosts[0].description);

      for (var i = 0; i < updatedPosts.length; i++) {
        if (
          updatedPosts[i].description
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1 ||
          updatedPosts[i].firstName
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1 ||
          updatedPosts[i].lastName
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1
        ) {
          filteredPostsNew.push(updatedPosts[i]);
        } else if (updatedPosts[i].audioPath) {
          if (
            updatedPosts[i].audioPath
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) !== -1
          ) {
            filteredPostsNew.push(updatedPosts[i]);
          }
        }
      }
      setFilteredPosts(filteredPostsNew);
    }
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {searchQuery &&
        filteredPosts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            audioPath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              audioPath={audioPath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      {!searchQuery &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            audioPath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              audioPath={audioPath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;

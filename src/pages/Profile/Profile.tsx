import { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserPostsThunk } from "../../store/slices/post/thunks";
import PostCard from "../../components/PostCard/PostCard";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { type Post, User } from "../../types";
import Card from "../../components/Card/Card";
import useUserRights from "../../hooks/useUserRights";
import { getUserByIdThunk } from "../../store/slices/user/thunks";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  const posts: Post[] = useAppSelector((store) => store.post.posts);
  const postsAuthor: User | null = posts.length > 0 ? posts[0].author : null;
  const currentUser = useAppSelector((store) => store.user.currentUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUserId, isOwner } = useUserRights();

  useEffect(() => {
    setIsLoading(true);
    if (!currentUserId) {
      navigate("/login");
      return;
    }

    dispatch(getUserByIdThunk(currentUserId)).then((actionResult) => {
      if (actionResult.meta.requestStatus === "rejected") {
        navigate("/404");
      }

      if (actionResult.meta.requestStatus === "fulfilled") {
        dispatch(getUserPostsThunk(currentUserId)).finally(() => {
          setIsLoading(false);
        });
      }
    });
  }, [currentUserId]);

  if (isLoading || !posts)
    return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div className={styles.container}>
      <h1>
        {postsAuthor
          ? `${postsAuthor?.firstName} ${postsAuthor?.lastName}`
          : `${currentUser?.firstName} ${currentUser?.lastName}`}
        's posts
      </h1>
      {isOwner && <AddPostForm />}
      {posts.length === 0 && (
        <Card className={styles.noPosts}>
          <h2>No posts yet!</h2>
        </Card>
      )}
      {posts.map((post) => (
        <PostCard
          key={`post-${post.id}`}
          className={styles.postCard}
          {...post}
        />
      ))}
    </div>
  );
};

export default Profile;

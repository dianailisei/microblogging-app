import { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getUserPostsThunk,
  loadMorePostsThunk,
} from "../../store/slices/post/thunks";
import PostCard from "../../components/PostCard/PostCard";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { Post, User } from "../../types";
import Card from "../../components/Card/Card";
import useUserRights from "../../hooks/useUserRights";
import { getUserByIdThunk } from "../../store/slices/user/thunks";
import { useNavigate } from "react-router-dom";

const NUMBER_OF_POSTS_PER_PAGE = 3;

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const posts: Post[] = useAppSelector((store) => store.post.posts);
  const postsAuthor: User | null = posts.length > 0 ? posts[0].author : null;
  const currentUser = useAppSelector((store) => store.user.currentUser);
  const totalPostsCount = useAppSelector((store) => store.post.totalPostsCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUserId, isOwner } = useUserRights();
  const canLoadMorePosts = !!posts && posts.length < totalPostsCount;

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

  // #region infinite scroll loading
  useEffect(() => {
    if (isLoading || isLoadingMore || !canLoadMorePosts || !currentUserId)
      return;

    const scrollHandler = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const threshold = 100;
      const isReachBottom =
        document.body.scrollHeight - threshold <= scrolledTo;

      if (isReachBottom) {
        setIsLoadingMore(true);
        dispatch(
          loadMorePostsThunk({
            userId: currentUserId,
            limit: NUMBER_OF_POSTS_PER_PAGE,
            offset: posts?.length,
          })
        ).finally(() => setIsLoadingMore(false));
      }
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isLoading, canLoadMorePosts, isLoadingMore, currentUserId, posts]);
  // #endregion

  if (isLoading || !posts)
    return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div data-testid="profile-page" className={styles.container}>
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

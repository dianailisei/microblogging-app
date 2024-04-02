import { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserPostsThunk } from "../../store/slices/post/thunks";
import PostCard from "../../components/PostCard/PostCard";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { Post } from "../../types";

function Profile() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const posts: Post[] = useAppSelector((store) => store.post.posts);
  const loggedUserId: string = useAppSelector(
    (store) => store.user.loggedUser!.id
  );
  const userId: string = searchParams.get("userid")!;

  useEffect(() => {
    dispatch(getUserPostsThunk(userId)).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !posts) return "loading...";

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      {loggedUserId.toString() === userId && <AddPostForm />}
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Profile;

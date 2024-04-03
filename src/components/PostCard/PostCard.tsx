import { ComponentProps, useEffect, useState } from "react";
import { type Post } from "../../types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import styles from "./PostCard.module.scss";
import { formatDate } from "../../utils";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addCommentThunk,
  getCommentsByPostThunk,
} from "../../store/slices/post/thunks";
import Comment from "../CommentCard/CommentCard";
import TextInput from "../TextInput/TextInput";
type PostCardProps = Post & ComponentProps<"div">;

function PostCard(props: PostCardProps) {
  const { id, title, content, modified, className } = props;
  const [newComment, setNewComment] = useState<string>("");

  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.post.comments[id]);
  
  useEffect(() => {
    dispatch(getCommentsByPostThunk(id));
  }, []);

  async function addComment() {
    await dispatch(addCommentThunk({ postId: id, content: newComment }));
    setNewComment("");
  }
  return (
    <Card className={clsx(styles.card, className)}>
      <h3>{title}</h3>
      <p className={styles.postContent}>{content}</p>
      <span className={styles.lastModified}>
        Last Modified: {formatDate(modified)}
      </span>
      {!!comments &&
        comments.map((comment) => <Comment key={`comment-${comment.id}`} {...comment} />)}
      <div className={styles.addComment}>
        <TextInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          label="New Comment"
        />
        <div className={styles.commentActions}>
          <Button variant="outlined" onClick={() => setNewComment("")}>
            Cancel
          </Button>
          <Button disabled={newComment === ""} onClick={addComment}>
            Add Comment
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default PostCard;

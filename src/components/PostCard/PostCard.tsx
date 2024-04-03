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
  deletePostThunk,
  getCommentsByPostThunk,
} from "../../store/slices/post/thunks";
import Comment from "../CommentCard/CommentCard";
import TextInput from "../TextInput/TextInput";
import ContextMenu from "../ContextMenu/ContextMenu";
import useIsLoggedUser from "../../utils/useIsLoggedUser";
import useContextMenu from "../../utils/useContextMenu";
type PostCardProps = Post & ComponentProps<"div">;

function PostCard(props: PostCardProps) {
  const { id, title, content, modified, className } = props;
  const [newComment, setNewComment] = useState<string>("");
  const { isLoggedUser } = useIsLoggedUser();

  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.post.comments[id]);

  useEffect(() => {
    dispatch(getCommentsByPostThunk(id));
  }, []);

  async function addComment() {
    await dispatch(addCommentThunk({ postId: id, content: newComment }));
    setNewComment("");
  }

  async function deletePost() {
    await dispatch(deletePostThunk(id));
    setIsOpen(false);
  }

  const {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  } = useContextMenu();

  return (
    <Card className={clsx(styles.card, className)}>
      {isLoggedUser && (
        <>
          <div
            ref={refs.setReference}
            {...getReferenceProps()}
            className={styles.moreOptions}
          >
            ⚙️
          </div>
          {isOpen && (
            <ContextMenu
              style={floatingStyles}
              ref={refs.setFloating}
              {...getFloatingProps()}
              items={[{ id: 1, name: "Delete post", onClick: deletePost }]}
            />
          )}
        </>
      )}
      <h3>{title}</h3>
      <p className={styles.postContent}>{content}</p>
      <span className={styles.lastModified}>
        Last Modified: {formatDate(modified)}
      </span>
      {comments?.length &&
        comments.map((comment) => (
          <Comment key={`comment-${comment.id}`} {...comment} />
        ))}
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

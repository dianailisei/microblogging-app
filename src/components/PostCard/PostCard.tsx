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
  loadMoreCommentsByPostThunk,
} from "../../store/slices/post/thunks";
import Comment from "../CommentCard/CommentCard";
import TextInput from "../TextInput/TextInput";
import ContextMenu from "../ContextMenu/ContextMenu";
import useIsLoggedUser from "../../utils/useIsLoggedUser";
import useContextMenu from "../../utils/useContextMenu";
type PostCardProps = Post & ComponentProps<"div">;

const NUMBER_OF_COMMENTS_PER_PAGE = 3;

function PostCard(props: PostCardProps) {
  const { id, title, content, modified, className } = props;
  const [newComment, setNewComment] = useState<string>("");
  const { isLoggedUser } = useIsLoggedUser();

  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.post.comments[id]);
  const totalCommentsCount = useAppSelector(
    (store) => store.post.totalCommentsCount
  );
  const canLoadMoreComments =
    !!comments && comments.length < totalCommentsCount[id];

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

  async function loadMoreComments() {
    await dispatch(
      loadMoreCommentsByPostThunk({
        postId: id,
        limit: NUMBER_OF_COMMENTS_PER_PAGE,
        offset: comments?.length,
      })
    );
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
          <Button variant="ghost"
            ref={refs.setReference}
            {...getReferenceProps()}
           className={styles.moreOptions}
          >
            ⚙️
          </Button>
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
      {comments?.length > 0 &&
        comments.map((comment) => (
          <Comment key={`comment-${comment.id}`} {...comment} />
        ))}
      {canLoadMoreComments && (
        <div className={styles.loadMoreComments}>
          <Button variant="outlined" onClick={loadMoreComments}>
            Load More
          </Button>
        </div>
      )}
      <div className={styles.addComment}>
        <TextInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          label="New Comment"
        />
        {newComment.length > 0 && <div className={styles.commentActions}>
         <Button variant="ghost" onClick={() => setNewComment("")}>
          ❌
        </Button>
        <Button
          variant={"ghost"}
          disabled={newComment === ""}
          onClick={addComment}
        >
          ✔️
        </Button>
        </div>}
      </div>
    </Card>
  );
}

export default PostCard;

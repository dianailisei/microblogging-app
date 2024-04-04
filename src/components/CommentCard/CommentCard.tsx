import { ComponentProps } from "react";
import { Comment } from "../../types";
import Card from "../Card/Card";
import styles from "./CommentCard.module.scss";
import { formatDate } from "../../utils";
import clsx from "clsx";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteCommentThunk } from "../../store/slices/post/thunks";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

type CommentProps = Comment & ComponentProps<"div">;

const CommentCard = (props: CommentProps) => {
  const { id, content, postId, author, created, className } = props;

  const loggedUserId = useAppSelector((store) => store.user.loggedUser?.id);
  const dispatch = useAppDispatch();

  const {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  } = useContextMenu();

  const deleteComment = () => {
    dispatch(deleteCommentThunk({ id, postId }));
    setIsOpen(false);
  };

  return (
    <Card className={clsx(styles.card, className)}>
      {loggedUserId === author.id.toString() && (
        <>
          <Button
            variant="ghost"
            ref={refs.setReference}
            className={styles.moreOptions}
            {...getReferenceProps()}
          >
            ⚙️
          </Button>
          {isOpen && (
            <ContextMenu
              style={floatingStyles}
              ref={refs.setFloating}
              items={[
                { id: 1, name: "Delete comment", onClick: deleteComment },
              ]}
              {...getFloatingProps()}
            />
          )}
        </>
      )}
      <div>
        <Link to={`/profile?userid=${author.id}`} className={styles.authorName}>
          {author.firstName} {author.lastName} ·{" "}
        </Link>
        <span className={styles.createdDate}>{formatDate(created)}</span>
      </div>
      <p className={styles.content}>{content}</p>
    </Card>
  );
};

export default CommentCard;

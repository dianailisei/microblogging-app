import { ComponentProps } from "react";
import { Comment } from "../../types";
import Card from "../Card/Card";
import styles from "./CommentCard.module.scss";
import { formatDate } from "../../utils";
import clsx from "clsx";
import useIsLoggedUser from "../../utils/useIsLoggedUser";
import useContextMenu from "../../utils/useContextMenu";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useAppDispatch } from "../../store";
import { deleteCommentThunk } from "../../store/slices/post/thunks";

type CommentProps = Comment & ComponentProps<"div">;

function CommentCard(props: CommentProps) {
  const { id, content, postId, author, created, className } = props;
  const { loggedUserId, isLoggedUser } = useIsLoggedUser();
  const {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  } = useContextMenu();
  
  const dispatch = useAppDispatch();

  async function deleteComment() {
    await dispatch(deleteCommentThunk({ id, postId }));
    setIsOpen(false);
  }

  return (
    <Card className={clsx(styles.card, className)}>
      {(isLoggedUser || loggedUserId===author.id) && (
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
              items={[
                { id: 1, name: "Delete comment", onClick: deleteComment },
              ]}
            />
          )}
        </>
      )}
      <h3>
        {author.firstName} {author.lastName}
      </h3>
      <p>{content}</p>
      <p>Created: {formatDate(created)}</p>
    </Card>
  );
}

export default CommentCard;

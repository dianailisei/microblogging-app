import { ComponentProps } from "react";
import { Comment } from "../../types";
import Card from "../Card/Card";
import styles from "./CommentCard.module.scss";
import { formatDate } from "../../utils";
import clsx from "clsx";

type CommentProps = Comment & ComponentProps<"div">;

function CommentCard(props: CommentProps) {
  const { content, author, created, className } = props;
  return (
    <Card className={clsx(styles.card, className)}>
      <h3>
        {author.firstName} {author.lastName}
      </h3>
      <p>{content}</p>
      <p>Created {formatDate(created)}</p>
    </Card>
  );
}

export default CommentCard;

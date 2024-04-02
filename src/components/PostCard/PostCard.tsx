import { ComponentProps } from "react";
import { Post } from "../../types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import styles from "./PostCard.module.scss";
import { formatDate } from "../../utils";

type PostCardProps = Post & ComponentProps<"div">;

function PostCard(props: PostCardProps) {
  const { title, content, modified,  } = props; //author, ...rest

  return (
    <Card className={styles.card}>
      <h3>{title}</h3>
      <p className={styles.postContent}>
       {content}
      </p>
      <div className={styles.addComment}>
        <span className={styles.lastModified}>Last Modified: {formatDate(modified)}</span>
        <Button variant="outlined">Add comment</Button>
      </div>
    </Card>
  );
}

export default PostCard;

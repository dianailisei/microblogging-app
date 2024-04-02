import { useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import TextInput from "../TextInput/TextInput";

import styles from './AddPostForm.module.scss';

function AddPostForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <Card className={styles.card}>
        <h3>Add new post</h3>
      <TextInput
        name="title"
        type="text"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextInput
        name="content"
        type="text"
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button>Add post</Button>
    </Card>
  );
}

export default AddPostForm;

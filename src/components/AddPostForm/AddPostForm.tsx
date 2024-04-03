import { useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import TextInput from "../TextInput/TextInput";

import styles from "./AddPostForm.module.scss";
import { createPostThunk } from "../../store/slices/post/thunks";
import { useAppDispatch } from "../../store";

function AddPostForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useAppDispatch();
  async function createPost() {
    await dispatch(createPostThunk({ title, content }));
    setTitle("");
    setContent("");
  }

  return (
    <Card className={styles.card}>
      <h3>Add new post</h3>
      <div className={styles.addPostForm}>
        <TextInput
          id="title"
          name="title"
          type="text"
          label="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          id="content"
          name="content"
          type="text"
          label="Content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <Button disabled={title === "" || content === ""} onClick={createPost}>
          Add post
        </Button>
      </div>
    </Card>
  );
}

export default AddPostForm;

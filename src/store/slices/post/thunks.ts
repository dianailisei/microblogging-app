import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { Post, Comment } from "../../../types";

export const getUserPostsThunk = createAsyncThunk(
  "users/posts",
  async (userId: string) => {
    const response = await axios.get<{ items: Post[]; totalCount: number }>(
      `/users/${userId}/posts`
    );
    return response.data;
  }
);

export const createPostThunk = createAsyncThunk<
  Post,
  Pick<Post, "title" | "content">
>("posts", async (post: Pick<Post, "title" | "content">): Promise<Post> => {
  const response = await axios.post<Post>("/posts", post);
  return response.data;
});

export const getCommentsByPostThunk = createAsyncThunk(
  "posts/comments",
  async (postId: string) => {
    const response = await axios.get<{ items: Comment[] }>(
      `/posts/${postId}/comments`
    );
    return response.data;
  }
);

export const addCommentThunk = createAsyncThunk("posts/comment", async (comment: Pick<Comment, "postId" | "content">): Promise<Comment> => {
  const response = await axios.post<Comment>("/comments", comment);
  return response.data;
});

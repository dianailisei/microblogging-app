import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { type Post, Comment } from "../../../types";

export const getUserPostsThunk = createAsyncThunk(
  "users/posts",
  async (userId: string) => {
    const response = await axios.get<{ items: Post[]; totalCount: number }>(
      `/users/${userId}/posts?limit=3&offset=0`
    );
    return response.data;
  }
);

export const loadMorePostsThunk = createAsyncThunk(
  "posts/loadMore",
  async (payload: {userId: string, limit:number, offset: number}) => {
    const response = await axios.get<{ items: Post[] , totalCount:number}>(
      `/users/${payload.userId}/posts?limit=${payload.limit}&offset=${payload.offset}`
    );
    return response.data;
  }
);

export const createPostThunk = createAsyncThunk<
  Post,
  Pick<Post, "title" | "content">
>("posts/add", async (post: Pick<Post, "title" | "content">): Promise<Post> => {
  const response = await axios.post<Post>("/posts", post);
  return response.data;
});

export const getCommentsByPostThunk = createAsyncThunk(
  "posts/comments",
  async (postId: string) => {
    const response = await axios.get<{ items: Comment[] , totalCount:number}>(
      `/posts/${postId}/comments?limit=3&offset=0`
    );
    return response.data;
  }
);

export const loadMoreCommentsByPostThunk = createAsyncThunk(
  "posts/comments/loadMore",
  async (payload: {postId: string, limit:number, offset: number}) => {
    const response = await axios.get<{ items: Comment[] , totalCount:number}>(
      `/posts/${payload.postId}/comments?limit=${payload.limit}&offset=${payload.offset}`
    );
    return response.data;
  }
);

export const addCommentThunk = createAsyncThunk(
  "posts/comment/add",
  async (comment: Pick<Comment, "postId" | "content">): Promise<Comment> => {
    const response = await axios.post<Comment>("/comments", comment);
    return response.data;
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/delete",
  async (postId: string) => {
    await axios.delete(`/posts/${postId}`);
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "posts/comments/delete",
  async (comment: { id: string; postId: string }) => {
    await axios.delete(`/comments/${comment.id}`);
  }
);

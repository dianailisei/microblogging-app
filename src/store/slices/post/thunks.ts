import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { Post } from "../../../types";

export const getUserPostsThunk = createAsyncThunk(
  "users/posts",
  async (userId: string) => {
    const response = await axios.get<{items: Post[], totalCount:number}>(`/users/${userId}/posts`);
    return response.data;
  }
);

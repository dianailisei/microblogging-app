import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentThunk,
  createPostThunk,
  getCommentsByPostThunk,
  getUserPostsThunk,
} from "./thunks";
import { type Post, Comment } from "../../../types";

type PostState = {
  posts: Post[];
  totalCount: number;
  comments: { [id: string]: Comment[] };
};
const initialState: PostState = {
  posts: [],
  totalCount: 0,
  comments: {},
};

export const postSlice = createSlice({
  name: "postState",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserPostsThunk.fulfilled, (state, action) => {
      state.posts = action.payload.items;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.totalCount += 1;
    });
    builder.addCase(getCommentsByPostThunk.fulfilled, (state, action) => {
      const { items } = action.payload;
      state.comments = { ...state.comments, [items[0]?.postId]: items  as Comment[] };
    });
    builder.addCase(addCommentThunk.fulfilled, (state, action) => {
      const { postId } = action.payload;
      state.comments = {
        ...state.comments,
        [postId]: [...state.comments[postId], action.payload] as Comment[],
      };
    });
  },
});

export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentThunk,
  createPostThunk,
  deleteCommentThunk,
  deletePostThunk,
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
  reducers: {
    clearPosts(state, action) {
      state.posts = [];
      state.totalCount = 0;
      state.comments = {};
    },
  },
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
      state.comments = {
        ...state.comments,
        [items[0]?.postId]: items as Comment[],
      };
    });
    builder.addCase(addCommentThunk.fulfilled, (state, action) => {
      const { postId } = action.payload;

      if (state.comments[postId]) {
        state.comments[postId] = [...state.comments[postId], action.payload];
      } else {
        state.comments = { ...state.comments, [postId]: [action.payload] };
      }
    });
    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      let newPosts = [...state.posts];
      newPosts = newPosts.filter((p) => p.id !== action.meta.arg);

      const postComments = state.comments;
      delete postComments[action.meta.arg];

      state.posts = newPosts;
      state.comments = postComments;
    });
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      const { id, postId } = action.meta.arg;
      const deletedComment = state.comments[postId].findIndex(
        (c) => c.id === id
      );
      const newComments = state.comments[postId];
      newComments.splice(deletedComment, 1);
      state.comments = { ...state.comments, [postId]: newComments };
    });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;

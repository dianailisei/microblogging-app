import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentThunk,
  createPostThunk,
  deleteCommentThunk,
  deletePostThunk,
  getCommentsByPostThunk,
  getUserPostsThunk,
  loadMoreCommentsByPostThunk,
  loadMorePostsThunk,
} from "./thunks";
import { Post, Comment } from "../../../types";

type PostState = {
  posts: Post[];
  totalPostsCount: number;
  comments: { [id: string]: Comment[] };
  totalCommentsCount: { [id: string]: number };
};
const initialState: PostState = {
  posts: [],
  totalPostsCount: 0,
  comments: {},
  totalCommentsCount: {},
};

export const postSlice = createSlice({
  name: "postState",
  initialState: initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
      state.totalPostsCount = 0;
      state.comments = {};
      state.totalCommentsCount = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPostsThunk.pending, () => {
      clearPosts();
    });
    builder.addCase(getUserPostsThunk.fulfilled, (state, action) => {
      state.posts = action.payload.items;
      state.totalPostsCount = action.payload.totalCount;
    });
    builder.addCase(loadMorePostsThunk.fulfilled, (state, action) => {
      const { items } = action.payload;
      state.posts = [...state.posts, ...items];
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.totalPostsCount += 1;
    });
    builder.addCase(getCommentsByPostThunk.fulfilled, (state, action) => {
      const { items, totalCount } = action.payload;
      const postId = items[0]?.postId;
      state.comments = {
        ...state.comments,
        [postId]: items as Comment[],
      };

      state.totalCommentsCount[postId] = totalCount;
    });
    builder.addCase(loadMoreCommentsByPostThunk.fulfilled, (state, action) => {
      const { items } = action.payload;
      const postId = action.meta.arg.postId;

      state.comments[postId] = [...state.comments[postId], ...items];
    });

    builder.addCase(addCommentThunk.fulfilled, (state, action) => {
      const { postId } = action.payload;

      if (state.comments[postId]) {
        state.comments[postId] = [...state.comments[postId], action.payload];
      } else {
        state.comments = { ...state.comments, [postId]: [action.payload] };
      }
      state.totalCommentsCount[postId] += 1;
    });

    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      let newPosts = [...state.posts];
      newPosts = newPosts.filter((p) => p.id !== action.meta.arg);

      const postComments = state.comments;
      delete postComments[action.meta.arg];

      state.posts = newPosts;
      state.comments = postComments;
      state.totalPostsCount -= 1;
    });
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      const { id, postId } = action.meta.arg;
      const deletedComment = state.comments[postId].findIndex(
        (c) => c.id === id
      );
      const newComments = state.comments[postId];
      newComments.splice(deletedComment, 1);
      state.comments = { ...state.comments, [postId]: newComments };
      state.totalCommentsCount[postId] -= 1;
    });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;

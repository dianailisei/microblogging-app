import { createSlice } from "@reduxjs/toolkit";
import { getUserPostsThunk } from "./thunks";
import { Post } from "../../../types";

type PostState = {
  posts: Post[];
  totalCount: number;
};
const initialState: PostState = {
    posts: [],
    totalCount: 0
};

export const postSlice = createSlice({
  name: "postState",
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPostsThunk.fulfilled, (state, action) => {
      state.posts = action.payload.items;
      state.totalCount = action.payload.totalCount;
    });
  },
});


export default postSlice.reducer;

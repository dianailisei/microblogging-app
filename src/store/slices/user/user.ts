import { createSlice, isFulfilled } from "@reduxjs/toolkit";
import { createUserThunk, getUserByIdThunk, loginUserThunk } from "./thunks";
import { type User } from "../../../types";

type UserState = {
  loggedUser: User | null;
  currentUser: User | null;
};
const initialState: UserState = {
  loggedUser: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    setUser(state, action: { payload: User }) {
      state.loggedUser = action.payload;
      state.loggedUser.id = action.payload.id.toString();
    },
    clearUser(state) {
      state.loggedUser = null;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserByIdThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.currentUser.id = state.currentUser.id.toString();
    });
    builder.addMatcher(
      isFulfilled(loginUserThunk, createUserThunk),
      (state, action) => {
        localStorage.setItem(
          "accessToken",
          action.payload.accessToken as string
        );
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.loggedUser = action.payload;
        state.loggedUser.id = state.loggedUser.id.toString();
      }
    );
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

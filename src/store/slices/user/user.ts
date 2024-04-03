import { createSlice } from "@reduxjs/toolkit";
import { getUserByIdThunk, loginUserThunk } from "./thunks";
import { User } from "../../../types";
import { AppDispatch } from "../..";

type UserState = {
  loggedUser: User | null;
  currentUser: User | null;
};
const initialState: UserState = {
  loggedUser: null,
  currentUser: null
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.loggedUser = action.payload;
    },
    clearUser(state, action){
      state.loggedUser = null;
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken as string);
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.loggedUser = action.payload;
    });
    builder.addCase(getUserByIdThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const hydrateUser = () => {
  return (dispatch: AppDispatch) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  };
};

export const { setUser,clearUser } = userSlice.actions;

export default userSlice.reducer;

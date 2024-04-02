import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./thunks";
import { User } from "../../../types";
import { AppDispatch } from "../..";

type UserState = {
  loggedUser: User | null;
};
const initialState: UserState = {
  loggedUser: null,
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.loggedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken as string);
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.loggedUser = action.payload;
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

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

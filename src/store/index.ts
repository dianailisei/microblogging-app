import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setUser, userSlice } from "./slices/user/user";
import { postSlice } from "./slices/post/post";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const storedUser = localStorage.getItem("user");
if (storedUser) {
  store.dispatch(setUser(JSON.parse(storedUser)));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => {
  return useDispatch<AppDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

import { combineReducers } from "redux";
import { RenderOptions, render } from "@testing-library/react";
import { userSlice } from "../store/slices/user/user";
import { postSlice } from "../store/slices/post/post";
import { Action, EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { loggedUserState } from "./loggedUserState";

const customRender = (
  ui: React.ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: combineReducers({
        user: userSlice.reducer,
        post: postSlice.reducer,
      }),
      preloadedState: loggedUserState,
    }),
    ...renderOptions
  }: {
    initialState?: RootState;
    store?: EnhancedStore<RootState, Action>;
    renderOptions?: RenderOptions;
  } = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

export { customRender as render };

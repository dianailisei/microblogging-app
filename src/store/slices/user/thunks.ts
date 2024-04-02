import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserCredetials } from "../../../types";
import axios from "../../../axios";

export const loginUserThunk = createAsyncThunk(
  "users/auth",
  async (payload: UserCredetials) => {
    const response = await axios.post(`/users/auth`, payload);
    return response.data as User;
  }
);

import axios from "../axios";
import { type UserCredetials, User } from "../types/user";

export const loginUser = async (credentials: UserCredetials) => {
  try {
    const response = await axios.post(`/users/auth`, credentials);
    return response;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(`/users`, user);
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

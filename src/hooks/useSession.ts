import { useNavigate, createSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store";
import { loginUserThunk } from "../store/slices/user/thunks";
import { UserCredetials } from "../types";
import { clearUser } from "../store/slices/user/user";
import { clearPosts } from "../store/slices/post/post";

const useSession = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");

  function login(credentials: UserCredetials) {
    dispatch(loginUserThunk(credentials))
      .unwrap()
      .then((result) => {
        navigate({
          pathname: "/profile",
          search: createSearchParams({
            userid: result.id.toString(),
          }).toString(),
        });
      });
  }

  function logout() {
    localStorage.clear();
    dispatch(clearUser());
    dispatch(clearPosts());
    navigate("/login");
  }

  return { login, logout, isLoggedIn };
};

export default useSession;

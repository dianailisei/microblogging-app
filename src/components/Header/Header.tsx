import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAppDispatch } from "../../store";
import { clearUser } from "../../store/slices/user/user";
import { clearPosts } from "../../store/slices/post/post";

function Header() {
  const isUserLoggedIn = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function logout() {
    localStorage.clear();
    dispatch(clearUser);
    dispatch(clearPosts);
    navigate("/login");
  }
  return (
    <header className={styles.headerContainer}>
      <Link to="/profile" className={styles.container}>
        <img src="/icon.png" alt="logo" />
        <h2>Chit-Chat</h2>
      </Link>
      <div className={styles.container}>
        {isUserLoggedIn ? (
          <div className={styles.link} onClick={logout}>
            Logout
          </div>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

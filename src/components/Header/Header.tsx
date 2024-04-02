import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const isUserLoggedIn = !!localStorage.getItem("accessToken");
  return (
    <header className={styles.headerContainer}>
      <div className={styles.container}>
        <img src="/icon.png" alt="logo" />
        <h2>Chit-Chat</h2>
      </div>
      <div className={styles.container}>
        {isUserLoggedIn ? (
          <Link to="/feed" className={styles.link}>Posts</Link>
        ) : (
          <Link to="/login" className={styles.link}>Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;

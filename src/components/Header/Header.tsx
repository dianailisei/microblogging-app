import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import useSession from "../../hooks/useSession";

const Header = () => {
  const { logout, isLoggedIn } = useSession();

  return (
    <header className={styles.headerContainer}>
      <Link to="/profile" className={styles.container}>
        <img src="/icon.png" alt="logo" />
        <h2>Chit-Chat</h2>
      </Link>
      <div className={styles.container}>
        {isLoggedIn ? (
          <div className={styles.link} onClick={logout}>
            Logout
          </div>
        ) : (
          <div>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  
  return (
    <Card data-testid="error-page" className={styles.card}>
      <h1>Are you lost? 🤔</h1>
      <Button onClick={() => navigate("/profile")}>Bring me back</Button>
    </Card>
  );
};

export default ErrorPage;

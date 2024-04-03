import { type SyntheticEvent, useState } from "react";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import Card from "../../components/Card/Card";

import styles from "./Login.module.scss";
import useSession from "../../hooks/useSession";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useSession();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className={styles.container}>
      <Card className={styles.loginCard}>
        <h1>Login and Chit-Chat 😊</h1>
        <form onSubmit={submitHandler}>
          <TextInput
            name="username"
            type="text"
            label="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>Log In</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;

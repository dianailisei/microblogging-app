import { SyntheticEvent, useState } from "react";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import Card from "../../components/Card/Card";

import styles from "./Login.module.scss";

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
  }
  return (
    <div className={styles.container}>
    <Card className={styles.loginCard}>
      <h1>Login and Chit-Chat 😊</h1>
      <form onSubmit={onSubmit}>
        <TextInput
          name="username"
          type="text"
          label="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button >Log In</Button>
      </form>
    </Card>
    </div>
  );
}

export default Login;

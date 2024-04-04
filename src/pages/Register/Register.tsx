import { SyntheticEvent, useState } from "react";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import Card from "../../components/Card/Card";

import styles from "./Register.module.scss";
import useSession from "../../hooks/useSession";
import { RegisterUserData } from "../../types";

const Register = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { register } = useSession();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    register({ firstName, lastName, username, password } as RegisterUserData);
  };

  return (
    <div className={styles.container} data-testid="register-page">
      <Card className={styles.registerCard}>
        <h1>Register and Chit-Chat 😊</h1>
        <form onSubmit={submitHandler}>
          <TextInput
            name="firstname"
            type="text"
            label="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            name="lastName"
            type="text"
            label="LastName"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <Button>Register</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;

import { ComponentPropsWithRef } from "react";
import styles from "./TextInput.module.scss";

export interface TextInputProps extends ComponentPropsWithRef<"input"> {
    label: string;
  }

function TextInput(props: TextInputProps) {
  const { name, label } = props;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input {...props} className={styles.input} />
    </div>
  );
}

export default TextInput;

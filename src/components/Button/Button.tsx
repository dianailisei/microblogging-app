import { ComponentPropsWithRef } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  variant?: "contained" | "outlined";
} & ComponentPropsWithRef<"button">;

function Button(props: ButtonProps) {
  const { className, children, variant = "contained" } = props;
  return (
    <button
      type="submit"
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

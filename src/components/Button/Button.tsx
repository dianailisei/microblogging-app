import { ComponentPropsWithRef } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  variant?: "contained" | "outlined";
} & ComponentPropsWithRef<"button">;

function Button(props: ButtonProps) {
  const { className, children, disabled, variant = "contained" } = props;
  return (
    <button
      type="submit"
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

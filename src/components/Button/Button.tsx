import { type ComponentPropsWithRef } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import React from "react";

type ButtonProps = {
  variant?: "contained" | "outlined" | "ghost";
} & ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      disabled,
      variant = "contained",
      ...rest
    } = props;
    return (
      <button
        type="submit"
        ref={ref}
        className={clsx(styles.button, styles[variant], className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;

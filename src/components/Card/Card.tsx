import { ComponentProps } from "react";
import styles from "./Card.module.scss";
import clsx from "clsx";

const Card = (props: ComponentProps<"div">) => {
  const { children, className, ...rest } = props;
  return (
    <div className={clsx(styles.card, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;

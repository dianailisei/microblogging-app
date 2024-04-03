import React from "react";
import { type ComponentProps } from "react";
import styles from "./ContextMenu.module.scss";

type ContextMenuProps = {
  items: [{ id: number; name: string; onClick: () => void }];
} & ComponentProps<"div">;

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  (props, ref) => {
    const { items, style, ...rest } = props;
    return (
      <div ref={ref} className={styles.contextMenu} style={style} {...rest}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className={styles.menuButton}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  }
);

export default ContextMenu;

import { useClick, useFloating, useInteractions } from "@floating-ui/react";
import { useState } from "react";

const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return { isOpen, setIsOpen, refs, floatingStyles, getReferenceProps, getFloatingProps };
};

export default useContextMenu;

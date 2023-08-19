import { useCallback, useState } from "react";

export default function useRowToggle(initialState) {
  const [isOpen, setOpenState] = useState(initialState);

  const toggle = useCallback(() => {
    setOpenState((state) => !state);
  }, [setOpenState]);

  return { isOpen, toggle };
}

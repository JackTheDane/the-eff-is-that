import { useEffect } from "react";
import { useRefValue } from "./useRefValue";
export const useKeyboardEvent = (callback: (event: KeyboardEvent) => void) => {
  const callbackRef = useRefValue(callback);

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      callbackRef.current(event);
    };

    document.addEventListener("keydown", onKeyPress);

    return () => document.removeEventListener("keydown", onKeyPress);
  }, []);
};

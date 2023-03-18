import { useEffect } from "react";
import { useRef } from "react";

export const useRefValue = <T>(value: T) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};

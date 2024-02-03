import React, { forwardRef } from "react";
import { useCombinedClasses } from "../../hooks/useCombinedClasses";
import styles from "./TextInput.module.scss";

export type NumberInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "value" | "onChange"
> & {
  value?: string;
  onChange(newValue: string): void;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="number"
        className={useCombinedClasses(className, styles.input)}
        value={value}
        onChange={({ target }) => {
          onChange(target.value);
        }}
        {...props}
      />
    );
  }
);

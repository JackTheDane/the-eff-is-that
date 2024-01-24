import React, { FunctionComponent, forwardRef } from "react";
import { useCombinedClasses } from "../../hooks/useCombinedClasses";
import styles from "./TextInput.module.scss";

export type TextInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "value" | "onChange"
> & {
  value?: string;
  onChange(newValue: string): void;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
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

import React, { forwardRef } from "react";
import { combineClasses } from "../../utils/combineClasses";
import styles from "./TextInput.module.scss";

export type NumberInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "value" | "onChange"
> & {
  value?: number;
  onChange(newValue: number): void;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="number"
        className={combineClasses(className, styles.input)}
        value={value}
        onChange={(event) => {
          // TODO: Fix this for PictureZoomer
          event.preventDefault();
          event.stopPropagation();
          onChange(Number.parseFloat(event.target.value));
        }}
        {...props}
      />
    );
  }
);

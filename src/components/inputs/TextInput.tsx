import React, { FunctionComponent } from "react";
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

export const TextInput: FunctionComponent<TextInputProps> = ({
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type="text"
      className={useCombinedClasses(className, styles.input)}
      value={value}
      onChange={({ target }) => {
        onChange(target.value);
      }}
      {...props}
    />
  );
};

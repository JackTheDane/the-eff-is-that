import React, { FC } from "react";
import { useCombinedClasses } from "../hooks/useCombinedClasses";
import styles from "./Button.module.scss";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  size?: "medium" | "large";
  variant?: "danger" | "success" | "neutral";
};

const getButtonVariantClassName = (theme: ButtonProps["variant"]) => {
  switch (theme) {
    case "danger":
      return styles.danger;

    case "success":
      return styles.success;

    case "neutral":
    default:
      return null;
  }
};

export const Button: FC<ButtonProps> = ({
  className,
  size = "medium",
  variant: theme = "neutral",
  style,
  ...props
}) => {
  return (
    <button
      {...props}
      className={useCombinedClasses(
        className,
        styles.root,
        getButtonVariantClassName(theme)
      )}
      style={{
        fontSize: size === "medium" ? 18 : 24,
        ...style,
      }}
    ></button>
  );
};

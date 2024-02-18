import type { ComponentPropsWithoutRef, FC } from "react";
import { combineClasses } from "../utils/combineClasses";
import styles from "./Button.module.scss";

type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  size?: ButtonSize;
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

const getButtonSizeClassName = (theme: ButtonSize) => {
  switch (theme) {
    case "small":
      return styles.small;

    case "medium":
      return styles.medium;

    case "large":
      return styles.large;
  }
};

export const Button: FC<ButtonProps> = ({
  className,
  size = "medium",
  variant = "neutral",
  ...props
}) => {
  return (
    <button
      {...props}
      className={combineClasses(
        className,
        styles.root,
        getButtonVariantClassName(variant),
        getButtonSizeClassName(size)
      )}
    ></button>
  );
};

import React, { FC } from "react";
import { useCombinedClasses } from "../hooks/useCombinedClasses";
import styles from "./Button.module.scss";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  size?: "medium" | "large";
  variant?: "danger" | "success" | "neutral";
};

const getBackgroundColor = (theme: ButtonProps["variant"]): string => {
  switch (theme) {
    case "danger":
      return "red";

    case "success":
      return "green";

    case "neutral":
    default:
      return "transparent";
  }
};

export const Button: FC<ButtonProps> = ({
  className,
  size = "medium",
  variant: theme = "neutral",
  style,
  ...props
}) => {
  const fontSize = size === "medium" ? 18 : 24;
  const backgroundColor = getBackgroundColor(theme);

  return (
    <button
      {...props}
      className={useCombinedClasses(className, styles.root)}
      style={{
        backgroundColor,
        fontSize,
        ...style,
      }}
    ></button>
  );
};

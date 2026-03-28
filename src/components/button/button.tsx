import React from "react";
import styles from "./button.module.css";

type ButtonProps = React.ComponentProps<"button">;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);

import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className = "", type, ...rest }: ButtonProps) {
  const combinedClassName = `${styles.button} ${className}`.trim();

  return <button type={type ?? "button"} className={combinedClassName} {...rest} />;
}

export default Button;


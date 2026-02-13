import React from "react";
import styles from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...rest }, ref) => {
    const combinedClassName = `${styles.input} ${className}`.trim();

    return <input ref={ref} className={combinedClassName} {...rest} />;
  },
);

Input.displayName = "Input";

export default Input;


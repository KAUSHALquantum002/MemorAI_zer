import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  link?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "fill" | "outline";
  againstpage?: boolean;
  againstcard?: boolean;
}

/**
 * Button that can be clicked to navigate to a link or call a function
 *
 * @param props - The props object for the Button component
 * @param props.label - The text to display on the button
 * @param props.link - The link to navigate to when the button is clicked
 * @param props.onClick - The function to call when the button is clicked
 * @param props.type - The type of button (button or submit)
 * @param props.disabled - Whether the button is disabled
 * @param props.variant - The variant of the button (fill or outline)
 * @todo Implement button variants (fill and outline)
 */
const Button = (props: ButtonProps) => {
  const {
    label,
    link,
    onClick,
    type = "button",
    disabled = false,
    againstcard = false,
    againstpage = false,
  } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonStyle = `
    ${againstpage ? styles.button__againstpage : ""} 
    ${againstcard ? styles.button__againstcard : ""} 
    ${disabled ? styles.button__disabled : styles.button}`;

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = disabled;
    }
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && onClick) {
      onClick();
    }
  };

  return link ? (
    <Link to={link} onClick={onClick} className={buttonStyle}>
      {label}
    </Link>
  ) : type === "button" ? (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={buttonStyle}
      tabIndex={0}
    >
      {label}
    </div>
  ) : (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={buttonStyle}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;

import { useState } from "react";
import { COLORS } from "../constants/colors";

function Input(props) {
  const [focused, setFocused] = useState(false);

  const styles = {
    width: "100%",
    padding: "14px 16px",
    border: `1.5px solid ${focused ? COLORS.accent : COLORS.border}`,
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    marginBottom: "16px",
    backgroundColor: focused ? "#FFFFFF" : "#FAFAFA",
    color: COLORS.text,
    transition: "border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
    boxShadow: focused ? `0 0 0 3px ${COLORS.accent}1A` : "none",
    boxSizing: "border-box",
  };

  return (
  <div
    style={{
      position: "relative",
      marginBottom: "15px",
    }}
  >
    <input
      style={{
        ...styles,
        marginBottom: 0,
        paddingRight: props.rightIcon ? "45px" : "12px",
      }}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      autoComplete={props.autoComplete}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />

    {props.rightIcon && (
      <span
        onClick={props.onRightIconClick}
        style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          userSelect: "none",
          fontSize: "18px",
        }}
      >
        {props.rightIcon}
      </span>
    )}
  </div>
);
}

export default Input;


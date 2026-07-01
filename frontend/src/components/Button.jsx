import { useState } from "react";
import { COLORS } from "../constants/colors";

function Button(props) {
  const [hovered, setHovered] = useState(false);

  const baseColor = props.variant === "primary" ? COLORS.primary : COLORS.accent;
  const hoverColor = props.variant === "primary" ? COLORS.primaryHover : COLORS.accentHover;

  const styles = {
    backgroundColor: hovered ? hoverColor : baseColor,
    color: "#FFFFFF",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    width: "100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    gap:"10px",
    transition: "background-color 0.15s ease, transform 0.1s ease",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
  };

  return (
    <button
      style={styles}
      onClick={props.onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type={props.type || "button"}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;

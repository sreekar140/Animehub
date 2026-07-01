import { useState } from "react";
import { COLORS } from "../constants/colors";

function Button(props) {
  const [hovered, setHovered] = useState(false);

  const variants = {
  primary: {
    base: COLORS.primary,
    hover: COLORS.primaryHover,
  },
  accent: {
    base: COLORS.accent,
    hover: COLORS.accentHover,
  },
  explore: {
    base: COLORS.explore,
    hover: COLORS.exploreHover,
  },
};

const baseColor = variants[props.variant]?.base || COLORS.primary;
const hoverColor = variants[props.variant]?.hover || COLORS.primaryHover;
  
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

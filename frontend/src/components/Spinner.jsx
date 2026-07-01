import React from 'react'
import "./Spinner.css";
const Spinner = () => {
  return (
    <div 
    style={{
        width: "18px",
        height: "18px",
        border: "3px solid rgba(255,255,255,0.3)",
        borderTop: "3px solid white",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    }}
    ></div>
  )
}

export default Spinner;
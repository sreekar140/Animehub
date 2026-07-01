import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { COLORS } from "../constants/colors";
import AnimeCarousel from "../components/AnimeCarousel";
import { useEffect, useState } from "react";


const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1,
  opacity: 0.1 + Math.random() * 0.4,
}));

function Landing() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect (()=>{
    const token=localStorage.getItem("access");
    if(token){
      setIsLoggedIn(true);
    }
  },[]);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Stars */}
      {STARS.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            opacity: star.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Purple glow — top left */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Green glow — top right */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle center glow behind hero text */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(74,222,128,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "72px",
          paddingBottom: "56px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            display: "inline-block",
            marginBottom: "16px",
            padding: "4px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(74,222,128,0.25)",
            backgroundColor: "rgba(74,222,128,0.08)",
            color: "rgba(74,222,128,0.85)",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Discover · Track · Explore
        </div>
        <h1
          style={{
            color: COLORS.primary,
            fontSize: "4.5rem",
            marginBottom: "12px",
            fontWeight: "900",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          AnimeHub
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            marginBottom: "8px",
            fontSize: "17px",
            fontWeight: "400",
            letterSpacing: "0.01em",
          }}
        >
          Your Personal Anime Companion
        </p>

        <p
          style={{
            color: "rgba(255,255,255,0.25)",
            marginBottom: "40px",
            fontSize: "13px",
            letterSpacing: "0.02em",
          }}
        >
          Track your watchlist. Discover what's next.
        </p>

        <div
  style={{
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  }}
>
  {isLoggedIn ? (
    <div style={{ width: "160px" }}>
      <Button variant="explore">
        Explore
      </Button>
    </div>
  ) : (
    <>
      <div style={{ width: "160px" }}>
        <Button
          variant="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>

      <div style={{ width: "160px" }}>
        <Button
          variant="accent"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </div>
    </>
  )}
</div>
      </div>

      {/* Section label above carousel */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.18)",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Top Rated Anime
        </span>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", zIndex: 1 , overflow : "hidden"}}>
        <AnimeCarousel />
      </div>
    </div>
  );
}

export default Landing;
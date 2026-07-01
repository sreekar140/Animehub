import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS } from "../constants/colors";
import { loginuser } from "../api/auth";
// import loginArt from "../assets/login-art.png";
import Spinner from "../components/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const ErrorText = ({ message }) =>
  message ? (
    <p
      style={{
        color: COLORS.danger,
        fontSize: "12px",
        marginTop: "-10px",
        marginBottom: "12px",
        paddingLeft: "4px",
      }}
    >
      {message}
    </p>
  ) : null;

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // username or phone
  const [password, setPassword] = useState("");

  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading,setLoading]=useState(false);
  const [showpassword,setShowPassword]=useState(false);
  const validate = () => {
    let valid = true;

    setIdentifierError("");
    setPasswordError("");

    if (!identifier.trim()) {
      setIdentifierError("Enter your username or phone number");
      valid = false;
    } else {
      // if it looks like a phone attempt (mostly digits), enforce 10 digits
      const digitsOnly = identifier.trim().replace(/[^0-9]/g, "");
      const looksLikePhone = /^[0-9+\s-]+$/.test(identifier.trim());
      if (looksLikePhone && digitsOnly.length < 10) {
        setIdentifierError("Phone number must be exactly 10 digits");
        valid = false;
      }
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      valid = false;
    }
    
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setLoginError("");
    // identifier can be a username or a phone number — detect on submit
    const isPhone = /^[0-9+\s-]{7,15}$/.test(identifier.trim());
    const payload = isPhone
      ? { phone: identifier.trim(), password }
      : { username: identifier.trim(), password };
    
    try {
      const response = await loginuser(payload);
      localStorage.setItem("access",response.data.access);
      localStorage.setItem("refresh",response.data.refresh);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      setLoginError(
      error.response?.data?.detail ||
      "Invalid username or password"
    );
    } finally{
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: COLORS.background,
      }}
    >
      {/* Left panel — gradient + illustration */}
      <div
        style={{
          flex: 1,
          background: COLORS.loginPanelGradient,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "40px",
        }}
        className="auth-side-panel"
      >
        {/* <img
          src={loginArt}
          alt=""
          style={{
            maxWidth: "85%",
            maxHeight: "70%",
            objectFit: "contain",
            position: "relative",
            zIndex: 1,
          }}
        /> */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            marginTop: "32px",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              marginTop: "8px",
            }}
          >
            Pick up right where you left off
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
        className="auth-form-panel"
      >
        <div
          style={{
            backgroundColor: COLORS.card,
            padding: "56px 44px",
            borderRadius: "18px",
            width: "380px",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h2
            style={{
              color: COLORS.primary,
              textAlign: "center",
              marginBottom: "8px",
              fontSize: "26px",
              fontWeight: "700",
            }}
          >
            Login
          </h2>
          <p
            style={{
              textAlign: "center",
              color: COLORS.textSecondary,
              fontSize: "14px",
              marginBottom: "32px",
            }}
          >
            Sign in with your username or phone number
          </p>

          <Input
            type="text"
            placeholder="Username or phone number"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (identifierError) setIdentifierError("");
            }}
            name="identifier"
            autoComplete="username"
          />
          <ErrorText message={identifierError} />

          <Input
            type={showpassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            name="password"
            autoComplete="current-password"
            rightIcon={showpassword ? <FaEyeSlash/> : <FaEye/>}
            onRightIconClick={() => setShowPassword(!showpassword)}
          />
          <ErrorText message={passwordError} />
          <ErrorText message={loginError} />

          <div style={{ marginTop: "8px" }}>
            <Button variant="primary" onClick={handleSubmit} disabled = {loading}>
              {loading ? (
                <>
                <Spinner/>
                Loading...
                </>
              ): ("Login")}
            </Button>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: COLORS.textSecondary,
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <span
              style={{
                color: COLORS.accent,
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-side-panel {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;

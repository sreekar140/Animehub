import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS } from "../constants/colors";
import signupArt from "../assets/signup-art.jpg";
import { registeruser } from "../api/auth";
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

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading,setLoading] = useState(false);
  const [showpassword,setShowPassword]=useState(false);
  const validate = () => {
    let valid = true;

    // Reset all errors first
    setUsernameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    if (!username.trim()) {
      setUsernameError("Username cannot be empty");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email cannot be empty");
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (phone.length < 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      valid = false;
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
    try {
      const response = await registeruser({
        username,
        email,
        phone: `+91${phone}`,
        password,
      });
      toast.success("Account created successfully!");

    navigate("/login");

    } catch (error) {
    const errors = error.response?.data;

    if (errors.username) {
        setUsernameError(errors.username[0]);
    }

    if (errors.email) {
        setEmailError(errors.email[0]);
    }

    if (errors.phone) {
        setPhoneError(errors.phone[0]);
    }
    }finally{
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
      {/* Left panel — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
          order: 1,
        }}
        className="auth-form-panel"
      >
        <div
          style={{
            backgroundColor: COLORS.card,
            padding: "56px 44px",
            borderRadius: "18px",
            width: "380px",
            minHeight: "560px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h2
            style={{
              color: COLORS.accent,
              textAlign: "center",
              marginBottom: "8px",
              fontSize: "26px",
              fontWeight: "700",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              textAlign: "center",
              color: COLORS.textSecondary,
              fontSize: "14px",
              marginBottom: "32px",
            }}
          >
            Join to get personalized anime recommendations
          </p>

          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError("");
            }}
            name="username"
            autoComplete="username"
          />
          <ErrorText message={usernameError} />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            name="email"
            autoComplete="email"
          />
          <ErrorText message={emailError} />

          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 14px",
                border: `1.5px solid ${phoneError ? COLORS.danger : COLORS.border}`,
                borderRadius: "10px",
                backgroundColor: "#FAFAFA",
                color: COLORS.text,
                fontSize: "15px",
                fontWeight: "500",
                flexShrink: 0,
              }}
            >
              +91
            </div>
            <div style={{ flex: 1 }}>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10));
                  if (phoneError) setPhoneError("");
                }}
                name="phone"
                autoComplete="tel"
              />
            </div>
          </div>
          <ErrorText message={phoneError} />

          <Input
            type={showpassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            name="password"
            autoComplete="new-password"
            rightIcon={showpassword ? <FaEyeSlash/> : <FaEye/>}
            onRightIconClick={() => setShowPassword(!showpassword)}
          />
          <ErrorText message={passwordError} />

          <div style={{ marginTop: "8px" }}>
            <Button variant="accent" onClick={handleSubmit} disabled = {loading}>
              {loading? (
                <>
                <Spinner/>
                Loading...
                </>
              ) : ("SignUp")}
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
            Already have an account?{" "}
            <span
              style={{
                color: COLORS.primary,
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Right panel — gradient + illustration */}
      <div
        style={{
          flex: 1,
          background: COLORS.signupPanelGradient,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "40px",
          order: 2,
        }}
        className="auth-side-panel"
      >
        <img
          src={signupArt}
          alt=""
          style={{
            maxWidth: "85%",
            maxHeight: "70%",
            objectFit: "contain",
            position: "relative",
            zIndex: 1,
          }}
        />
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
            Join the community
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "15px",
              marginTop: "8px",
            }}
          >
            Discover your next favorite series
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-side-panel { display: none; }
        }
      `}</style>
    </div>
  );
}

export default Signup;

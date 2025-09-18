import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaUser, FaPhone, FaLock, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api";


export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Remove everything except numbers
    const sanitizedPhone = phone.replace(/\D/g, "");

    // ✅ Check if exactly 10 digits remain
    if (sanitizedPhone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await api.signup({ firstName, lastName, phone: sanitizedPhone, email: email || undefined, password });
      alert("Sign Up Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Sign up failed");
    }
  };

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 25px rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up
        </motion.h2>

        <form onSubmit={handleSignUp} style={{ width: "100%" }}>
          {/* First Name */}
          <motion.div style={styles.inputWrapper}>
            <FaUser style={styles.inputIcon} />
            <motion.input
              type="text"
              placeholder="First Name"
              style={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
              required
            />
          </motion.div>
          {/* Last Name */}
          <motion.div style={styles.inputWrapper}>
            <FaUser style={styles.inputIcon} />
            <motion.input
              type="text"
              placeholder="Last Name"
              style={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
            />
          </motion.div>

          {/* Phone Number */}
          <motion.div style={styles.inputWrapper}>
            <FaPhone style={styles.inputIcon} />
            <motion.input
              type="tel"
              placeholder="Phone Number"
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              // ❌ Removed pattern + maxLength so +91 etc. is allowed
              title="Enter your phone number (will be checked for 10 digits)"
              whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div style={styles.inputWrapper}>
            <FaEnvelope style={styles.inputIcon} />
            <motion.input
              type="email"
              placeholder="Email (optional)"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
            />
          </motion.div>

          {/* Password */}
          <motion.div style={styles.inputWrapper}>
            <FaLock style={styles.inputIcon} />
            <motion.input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ boxShadow: "0 0 12px #050505e6" }}
              required
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div style={styles.inputWrapper}>
            <FaLock style={styles.inputIcon} />
            <motion.input
              type="password"
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              whileFocus={{ boxShadow: "0 0 12px #050505e6" }}
              required
            />
          </motion.div>

          {/* Sign Up Button */}
          <motion.button
            type="submit"
            style={styles.loginBtn}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 6px 20px rgba(7, 134, 60, 1)",
            }}
          >
            Sign Up
          </motion.button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>Or Sign Up With</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Social Login */}
        <motion.div
          style={styles.iconRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            style={{ ...styles.iconBtn, background: "#fff" }}
            whileHover={{
              scale: 1.2,
              y: -4,
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            <FcGoogle size="clamp(18px, 4vw, 26px)" />
          </motion.button>
          <motion.button
            style={{ ...styles.iconBtn, background: "#1890f2ff" }}
            whileHover={{
              scale: 1.2,
              y: -4,
              boxShadow: "0 6px 20px rgba(24, 242, 242, 0.6)",
            }}
          >
            <FaFacebookF size="clamp(16px, 4vw, 24px)" color="#fff" />
          </motion.button>
        </motion.div>

        {/* Login Link */}
        <motion.div
          style={styles.links}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>Already have an account?</span>
          <button
              type="button"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontSize: "12px",
                 color: "#01290aff",
              }}
              onClick={() => navigate("/login")}
            >
             Login
            </button>
        </motion.div>
      </motion.div>
    </div>
  );
}


const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100dvh",
    width: "100%",
     padding: "clamp(10px, 3vw, 20px)", // small padding on mobile
    background:  " rgba(160, 242, 245, 0.49);",
    backgroundSize: "400% 400%",
    animation: "gradientBG 12s ease infinite",
    overflowY: "auto",
  },
  card: {
    background: "rgba(75, 212, 12, 0.15)",
    borderRadius: "20px",
    margin: "auto",
    padding: "clamp(10px, 2vw, 15px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    width: "100%",
    minWidth:"260px", //
    maxWidth: "clamp(320px,90vw,450px)",  //
    textAlign: "center",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(8, 224, 141, 0.3)",
    animation: "cardGlow 4s ease-in-out infinite",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "15px",
    fontSize:"clamp(20px, 5vw, 28px)",
    color: "#04996cff",
    fontWeight: "bold",
  },
  inputWrapper: {
    width: "90%",
    margin: "8px auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
    color: "rgba(9, 185, 133, 0.7)",
  },
  input: {
    width: "100%",
    padding: "10px 10px 10px 36px",
    borderRadius: "10px",
    border: "1px solid rgba(3, 109, 82, 0.4)",
    outline: "none",
    fontSize:  "clamp(12px, 2.5vw, 16px)",
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.15)",
    color: "#078555ff",
  },
  loginBtn: {
    width: "clamp(70%,200px,100%)",  //
    padding: "10px",
    margin: "8px auto",
    background: "#07381fff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize:  "clamp(12px, 2.5vw, 16px)",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "15px 0",
    width: "90%",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "rgba(3, 90, 54, 0.5)",
  },
  dividerText: {
    margin: "0 10px",
    color: "#05a058ff",
    fontSize: "clamp(10px, 2vw, 14px)", //
  },
  iconRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    margin: "3px 0",
  },
  iconBtn: {
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.3s",
  },

  
  links: {
    display: "flex",
    gap: "5px",
    margin: "10px",
    fontSize: "clamp(10px, 2vw, 14px)",
    color: "#034e35ff",
    paddingLeft: "0 clamp(5px, 5%, 20px)"
  },
  Link: { color: "hsla(0, 9%, 96%, 1.00)", textDecoration: "none" },
};

// Animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  html, body { margin: 0; padding: 0; height: 100%;overflow-y: auto; }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`, styleSheet.cssRules.length);
styleSheet.insertRule(`
@keyframes cardGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
  50% { box-shadow:  0 0 10px rgba(6, 119, 57, 1); }
}`, styleSheet.cssRules.length);
styleSheet.insertRule(`
.hover-underline:hover { text-decoration: underline; color: white; }
`, styleSheet.cssRules.length);

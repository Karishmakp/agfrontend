import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaPhone, FaLock, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function loginPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const isValidPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    return /^\d{10}$/.test(cleaned) || /^\d{11,14}$/.test(cleaned);
  };

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const sanitizedPhone = phone.replace(/\D/g, "");
  const isFormValid =
    !!password &&
    ((phone && isValidPhone(sanitizedPhone)) || (email && isValidEmail(email)));

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem("loginData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPhone(parsed.phone || "");
      setEmail(parsed.email || "");
      setPassword(parsed.password || "");
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    let userData = null;

    if (email) {
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      userData = { email, password };
    } else if (phone) {
      if (!isValidPhone(sanitizedPhone)) {
        alert("Please enter a valid phone number.");
        return;
      }
      userData = { phone: sanitizedPhone, password };
    } else {
      alert("Please enter email or phone number.");
      return;
    }

    try {
      const res = await api.login(userData);
      const { accessToken, refreshToken, user } = res; // user contains name/info

      // Save username in sessionStorage for Navbar
  sessionStorage.setItem("accessToken", accessToken);
  // Prefer firstName, fallback to name, fallback to email/phone
  const displayName = user.firstName || user.name || user.email || user.phone || "User";
  sessionStorage.setItem("username", displayName);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("loginData", JSON.stringify({ ...userData }));
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        localStorage.removeItem("loginData");
        localStorage.removeItem("refreshToken");
      }

      alert("Login Successful!");
      navigate("/"); // Redirect to profile after login
    } catch (err) {
      alert(err.message || "Login failed");
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
          boxShadow: "0 0 25px rgba(2, 139, 87, 0.3)",
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Login
        </motion.h2>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <motion.div style={styles.inputWrapper}>
            <FaPhone style={styles.inputIcon} />
            <motion.input
              type="tel"
              placeholder="Phone Number"
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              maxLength={15}
              whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
            />
          </motion.div>

          <motion.div style={styles.inputWrapper}>
            <FaEnvelope style={styles.inputIcon} />
            <motion.input
              type="email"
              placeholder="Email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
            />
          </motion.div>

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

          <div style={styles.rememberForgot}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember Me
            </label>
            <button
              type="button"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontSize:"clamp(12px, 2.2vw, 16px)",
                 color: "#01290aff",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={!isFormValid}
            style={{
              ...styles.loginBtn,
              opacity: isFormValid ? 1 : 0.6,
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
            whileHover={
              isFormValid
                ? {
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(0, 255, 170, 0.96)",
                  }
                : {}
            }
          >
            Login
          </motion.button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>Or Login With</span>
          <span style={styles.dividerLine}></span>
        </div>

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
            style={{ ...styles.iconBtn, background: "#1877F2" }}
            whileHover={{
              scale: 1.2,
              y: -4,
              boxShadow: "0 6px 20px rgba(24,119,242,0.6)",
            }}
          >
            <FaFacebookF size="clamp(16px, 4vw, 24px)" color="#fff" />
          </motion.button>
        </motion.div>

        <motion.div
          style={styles.links}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>Don't have an account?</span>
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
              onClick={() => navigate("/signup")}
            >
             Sign Up
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
    minHeight: "100dvh",
    width: "100%",
    padding: "20px",
     boxSizing: "border-box",
     background:  " rgba(160, 242, 245, 0.49);",
    backgroundSize: "400% 400%",
    animation: "gradientBG 12s ease infinite",
   
  },
  card: {
     background: "rgba(75, 212, 12, 0.15)",
    borderRadius: "20px",
    margin:0,
    padding: "clamp(15px, 3vw, 25px)",
   boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    width: "100%",
    maxWidth: "clamp(320px, 90vw, 420px)", // 
    textAlign: "center",
    backdropFilter: "blur(15px)",
   border: "1px solid rgba(8, 224, 141, 0.3)",
    animation: "cardGlow 4s ease-in-out infinite",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: { marginBottom: "15px", fontSize: "24px",  color: "#04996cff", fontWeight: "bold" },

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
    fontSize: "clamp(12px, 2.5vw, 16px)", //
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.15)",
    color: "#078555ff",
  },
  rememberForgot: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    margin: " 12px auto",
    alignItems: "center", 
    color: "#01290aff",
    paddingLeft:"10px",
    paddingRight:"10px",
    marginTop:"20px",
    boxSizing: "border-box",
   
  },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "5px",  fontSize: "clamp(10px, 2.2vw, 14px)" },
  checkbox: { transform: "scale(1.1)" },
  loginBtn: {
    width: "65%", 
    padding: "10px",
    margin: "8px auto",
    background: "#07381fff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "clamp(12px, 2.5vw, 16px)",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  divider: { display: "flex", alignItems: "center", margin: "15px 0", width: "90%" },
  dividerLine: { flex: 1, height: "1px", backgroundColor: "rgba(3, 90, 54, 0.5)", },
  dividerText: { margin: "0 10px",color: "#05a058ff", fontSize:  "clamp(10px, 2.2vw, 14px)" },
  iconRow: { display: "flex", justifyContent: "center", gap: "12px", margin: "4px 0" },
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
  links: { display: "flex", gap: "5px", marginTop: "10px", fontSize: "clamp(10px, 2.2vw, 14px)",  color: "#034e35ff", },
  Link: { color: "#034e35ff", textDecoration: "none" },
};

// Animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  html, body { margin: 0; padding: 0; height: 100%; overflow-x: hidden; overflow-y: auto;  }
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
  50% { box-shadow: 0 0 10px rgba(6, 119, 57, 1);f }
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
.hover-underline:hover { text-decoration: underline; }
`, styleSheet.cssRules.length);






import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: request, 2: reset
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Allow 10–14 digits
  const isValidPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 14;
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    let sanitizedPhone = phone.replace(/\D/g, "");
    let fullPhone = phone.trim();
    if (!fullPhone.startsWith("+")) {
      fullPhone = `+91${sanitizedPhone}`;
    }
    if (!isValidPhone(sanitizedPhone)) {
      setMessage("Enter valid phone number (10–14 digits)");
      return;
    }
    setLoading(true);
    try {
      await api.forgotPassword({ phone: fullPhone });
      setMessage("Reset code sent to your phone");
      setStep(2);
    } catch (err) {
      setMessage(err.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!code || code.length < 4) {
      setMessage("Enter the code you received");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      let sanitizedPhone = phone.replace(/\D/g, "");
      let fullPhone = phone.trim();
      if (!fullPhone.startsWith("+")) {
        fullPhone = `+91${sanitizedPhone}`;
      }
      await api.resetPassword({ phone: fullPhone, code, newPassword });
      setMessage("Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMessage(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </motion.h2>

        {step === 1 && (
          <motion.form onSubmit={handleRequest} style={{ width: "100%" }}>
            <motion.div style={styles.inputWrapper}>
              <FaPhone style={styles.inputIcon} />
              <motion.input
                type="tel"
                placeholder="Enter your phone number"
                style={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="numeric"
                maxLength={15}
                title="Enter 10–14 digit phone number"
                whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              style={styles.submitBtn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(5, 160, 88, 1)",
              }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Code"}
            </motion.button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form onSubmit={handleReset} style={{ width: "100%" }}>
            <motion.div style={styles.inputWrapper}>
              <motion.input
                type="text"
                placeholder="Enter the code you received"
                style={styles.input}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
                required
              />
            </motion.div>

            <motion.div style={styles.inputWrapper}>
              <motion.input
                type="password"
                placeholder="New password"
                style={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                whileFocus={{ boxShadow: "0 0 12px #030302e6" }}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              style={styles.submitBtn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(4, 139, 65, 1)",
              }}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </motion.form>
        )}

        {/* Back to Login Button */}
        <motion.button
          type="button"
          style={styles.backBtn}
          onClick={() => navigate("/login")}
          whileHover={{ textDecoration: "underline" }}
        >
          Back to Login
        </motion.button>

        {message && (
          <motion.p
            style={styles.message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
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
    background:  " rgba(160, 242, 245, 0.49);",
    backgroundSize: "cover",  //better scaling
    animation: "gradientBG 12s ease infinite",
    overflow: "hidden",
  },
  card: {
    background: "rgba(75, 212, 12, 0.15)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    width: "clamp(280px, 90%, 420px)",  //min 280px, preferred 90%, max 420px
    maxWidth: "420px",  // better on large screens
    textAlign: "center",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(8, 224, 141, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: { 
    marginBottom: "15px",
    fontSize: "clamp(18px, 5vw, 26px)", //Responsive font size using clamp
    color: "#04996cff", 
    fontWeight: "bold" 
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
    fontSize: "clamp(12px, 3vw, 15px)",  //Responsive font
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.15)",
    color: "#078555ff",
  },
  submitBtn: {
    width:"clamp(180px, 65%, 300px)",
    padding: "10px",
    margin: "15px auto 0 auto",
    background: "#07381fff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "clamp(12px, 3vw, 15px)",  //Responsive font
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  backBtn: {
  background: "transparent", 
  border: "none",             
  padding: 0,                 
  margin: "15px auto 0 auto", 
  fontSize: "clamp(12px, 3vw, 14px)",  // Responsive font
  color: "#078555ff",
  cursor: "pointer",
  textDecoration: "none",
  transition: "color 0.3s ease",
},

message: {
  marginTop: "15px",
  color: "#078555ff",
  fontWeight: "bold",
  fontSize: "clamp(12px, 3vw, 14px)", // Responsive font
 },

};

/*Extra tiny screen adjustments */
  const extraStyles = `
  @media (max-width: 320px) {
    input, button {
      font-size: 12px !important;
      padding: 8px !important;
    }
  }`;

// Inject extra styles into document head
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = extraStyles;
  document.head.appendChild(styleTag);
}




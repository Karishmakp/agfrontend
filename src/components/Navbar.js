import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';

import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  const navigate = useNavigate();

  // Detect resize for mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync user state with sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const username = sessionStorage.getItem("username");
      setUser(username);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    setUser(null);
    setMenuOpen(false); // Close mobile menu
    navigate("/login"); // Navigate to Login page
  };

  // Animation for nav links
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.3 }
    }),
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="navbar-wrapper">
      <div className="bck"></div>

      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
         <img 
         src="/assets/logo.jpg"   // place your logo file in public/assets or src/assets
         alt="AgrowMart Logo"
         className="logo-img"
         />
        <span className="logo-text">
        <strong>AGROWMART</strong> NATURALS
       </span>
        </div>
    
    
        {/* Hamburger for Mobile/Tablet */}
        {isMobile && (
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

     

        {/* Nav Links & Button */}
        
        <AnimatePresence>
          {(!isMobile || menuOpen) && (
            <ClickAwayListener onClickAway={() => setMenuOpen(false)}>        
            <motion.div
              className={`nav-links ${menuOpen ? "active" : ""}`}
              initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {["Home", "Company", "Services", "Contact"].map((item, i) => (
                <motion.a
                  href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                  key={i}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={i}

                  style={{ cursor: "pointer" }}  //
                  onClick={() => {               //
                  // Only close mobile menu, do not scroll
                   if (isMobile) setMenuOpen(false);
                   }}
                >
                  {item}
                </motion.a>
              ))}

              {/* Mobile Buttons */}
              {isMobile && (
                user ? (
                  <>
                    <motion.span
                      style={{ color: "#fff", cursor: "default", marginLeft: "10px" }}
                    >
                      Hi, {user}
                    </motion.span>
                    <motion.button
                      className="request-btn mobile-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </motion.button>
                    <motion.button
                      className="request-btn mobile-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    className="request-btn mobile-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                      onClick={() => setMenuOpen(false)}
                  >
                    <Link to="/getappsoon" style={{ textDecoration: "none", color: "inherit" }}>
                      Get an app soon
                    </Link>
                  </motion.button>
                )
              )}
            </motion.div>
            </ClickAwayListener>       //
          )}
        </AnimatePresence>

        {/* Desktop Buttons */}
        {!isMobile && (
          user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="user-name">Hi, {user || "Guest"}</span>
              <motion.button
                className="request-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => 
                   
                   navigate("/profile")}
              >
                Profile
              </motion.button>
            
            </div>
          ) : (
            <motion.button
              className="request-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/getappsoon" style={{ textDecoration: "none", color: "inherit" }}>
                Get an app soon
              </Link>
            </motion.button>
          )
        )}
      </nav>
    </div>
  );
};

export default Navbar;

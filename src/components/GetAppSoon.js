import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Footer from "./Footer";

export default function LandingPage() {


   const [navHeight, setNavHeight] = useState(0);
  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.querySelector(".navbar");
      if (nav) setNavHeight(nav.offsetHeight);
    };

    updateNavHeight(); // initial height
    window.addEventListener("resize", updateNavHeight); // resize 
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  return (
    <div  style={{ overflowX: "hidden" }}>
      {/* Top Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage:
            "url('https://www.harrowsmithmag.com/wp-content/uploads/2022/06/Veg-garden-.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: `calc(${navHeight}px + clamp(6rem, 10vw, 12rem))`,
           paddingBottom: "clamp(6rem, 10vw, 12rem)",
          minHeight: window.innerWidth < 600 ? "200px" : "clamp(300px, 60vh, 700px)"

        }}
      />

      {/* Middle Section */}
      <section
        className="middle-section"
        style={{
          background: "#f8f1e1",
          paddingTop: "clamp(3rem, 5vw, 6rem)",
          paddingBottom: "clamp(6rem, 10vw, 8rem)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Arc */}
        <div
          className="arc"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "clamp(120px, 18vh, 280px)", 
            background: "#0f8d13",
            borderBottomLeftRadius: "100% 100%",
            borderBottomRightRadius: "100% 100%",
            zIndex: 0,
            bottom: "auto",
          }}
        />

        {/* Left Images */}
        <motion.img
          src="/assets/left1.png"
          alt="Left Image 1"
          className="side-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: "absolute",
            left: "clamp(5%, 6vw, 10%)",
            top: "clamp(15%, 20vh, 25%)",
            width: "clamp(100px, 16vw, 250px)",
            zIndex: 1,
          }}
        />
        <motion.img
          src="/assets/left2.png"
          alt="Left Image 2"
          className="side-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: "absolute",
            left: "clamp(5%, 8vw, 12%)",
            top: "clamp(50%, 55vh, 60%)",
            width: "clamp(150px, 20vw, 300px)",
            zIndex: 1,
          }}
        />

        {/* Center Phone */}
        <motion.img
          src="/assets/phone.png"
          alt="App Preview"

           className="phone-image"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: "clamp(300px, 90vw, 900px)",
            height: "auto",
            margin: "0 auto",
            display: "block",
            position: "relative",
            zIndex: 2,
            objectFit: "contain",
          }}
        />

        {/* Right Images */}
        <motion.img
          src="/assets/right1.png"
          alt="Right Image 1"
          className="side-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: "absolute",
            right: "clamp(5%, 6vw, 10%)",
            top: "clamp(15%, 20vh, 25%)",
            width: "clamp(100px, 16vw, 250px)",
            zIndex: 1,
          }}
        />
        <motion.img
          src="/assets/right2.png"
          alt="Right Image 2"
          className="side-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: "absolute",
            right: "0",
            top: "clamp(45%, 50vh, 55%)",
            width: "clamp(200px, 35vw, 550px)",
            zIndex: 1,
          }}
        />
      </section>

      {/*  Media Queries */}
      <style>{`
        /* Tablets & small laptops */
        @media (max-width: 1024px) {
          .middle-section {
            padding-top: 2rem !important;
            padding-bottom: 3rem !important;
          }
        }

        /* Large desktops */
        @media (min-width: 1200px) {
          .middle-section img[alt="App Preview"] {
            max-width: 900px !important;
          }
        }

        /* Small screens adjustments */
        @media (max-width: 600px) {
          .arc {
              height: clamp(60px, 12vw, 120px) !important; 
             bottom: 0 !important; 
          }
          .middle-section img[alt="Left Image 1"],
          .middle-section img[alt="Right Image 1"] {
            top: auto !important;
            bottom: 45% !important;
            width: 90px !important;
          }
          .middle-section img[alt="Left Image 2"],
          .middle-section img[alt="Right Image 2"] {
            top: auto !important;
            bottom: 10% !important;
            width: 90px !important;
          }
        }

        /* Phones */
        @media (max-width: 768px) {
          .middle-section img[alt="App Preview"] {
            max-width: 65% !important;
          }
          .middle-section {
            padding-top: 1.5rem !important;
            padding-bottom: 2.5rem !important;
          }
        }

        /* Very short screens */
        @media (max-height: 500px) {
          .arc {
            height: 100px !important;
          }
        }

        /* Extra small phones */
        @media (max-width: 480px) {
          .middle-section img[alt="App Preview"] {
            max-width: 55% !important;
          }
          .middle-section {
            padding-top: 1rem !important;
            padding-bottom: 2rem !important;
          }
        }

        @media (max-width: 360px) {
          .middle-section img[alt="App Preview"] {
            max-width: 50% !important;
          }
          .middle-section {
            padding-top: 0.5rem !important;
            padding-bottom: 1.5rem !important;
          }
        }

        @media (min-width: 1800px) {
            .phone-image {
            max-width: 700px; 
            }
           .side-image {
            max-width: 450px; 
            }
           .arc {
           height: 350px; 
            }
        }

      `}</style>

      <Footer />
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";

const SliderRevolutionReact = ({ width = "100%", maxWidth = 940 }) => {
  const slides = [
    { 
      key: 1,
      img: "assets/img1.webp",
      title:"Real-Time AI Atmosphere Assistance",
      desc:"Our AI-powered system provides farmers with instant weather updates and forecasts.It helps them plan irrigation, sowing, and harvesting at the right time.This reduces risks and increases productivity with data-backed decisions.",
    },

    { 
      key: 2, 
      img: "assets/img2.jpg",
      title:"Agrowmart - 10 Mins Veggies App",
      desc:"Agrowmart delivers fresh vegetables to customers' doorsteps within just 10 minutes.It connects farmers directly with urban households for quick service.This ensures freshness, convenience, and fair prices for both sides.",
    },

    { 
      key: 3, 
      img: "assets/img3.jpg",
      title:"Agrowmart - Kissan Product Orders",
      desc:"Farmers can order farming essentials and Agrowmart products easily through the app.All items are delivered within 10 days to their home.This saves time, reduces travel, and ensures trusted quality supplies.",
    },

    {
      key:4,
      img:"assets/img4.jpg",
      title:"Scan and Detect",
      desc:"Farmers can upload pictures of their crops through the app. Our Al scans and detects possible diseases, pests, or soil issues.We provide quick and practical solutions to protect their yield."
    },

    {
      key:5,
      img:"assets/img5.png",
      title:"Healthcare",
      desc:"Animals & Cattles We offer veterinary healthcare support for animals and cattle. Farmers can consult experts, get preventive care tips, and treatment advice.This improves livestock health and ensures better farm productivity.",
    },

    {
      key:6,
      img:"assets/img6.jpg",
      title:"Agrow Mitra",
      desc:"A dedicated online platform where farmers can sell their products directly.It removes middlemen and gives them fair pricing for their harvest.Customers also get fresh produce straight from the farms.",
    },

    {
      key:7,
      img:"assets/img7.jpg",
      title:"Agrow International",
      desc:"We connect local farmers to international markets, especially in the Gulf.Through exporters, their products gain global reach and higher value.This increases farmers' income and builds global recognition for local produce.",
    },

  ];

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setVisible(true);
      }, 520);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const gotoNext = () => {
    stopAutoplay();
    setVisible(false);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setVisible(true);
      startAutoplay();
    }, 300);
  };

  const gotoPrev = () => {
    stopAutoplay();
    setVisible(false);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + slides.length) % slides.length);
      setVisible(true);
      startAutoplay();
    }, 300);
  };

  // Outer container
  const outerWrapperStyle = {
    width: "100%",
    backgroundColor: "#fffde7",
    padding: "clamp(10px, 3vw, 40px) 0", //changed to reduce space on small screens
    overflowX: "hidden",
    boxSizing: "border-box",
  };

  // Inner wrapper
  const innerWrapperStyle = {
    width,
    maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    margin: "0 auto",
    position: "relative",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "clamp(16px, 2vw, 24px)", //increased gap flexibility
    padding: "clamp(8px, 2vw, 16px)", //responsive padding
    boxSizing: "border-box",
  };

  // Text container
  const staticTextContainer = {
    flex: "0 1 45%", //changed from 300px → better for tablets/mobiles
    minWidth: "260px", 
    maxWidth: "480px", //increased from 400px → more breathing space on desktop
    margin: "0 auto",   //
    position: "relative",
    zIndex: 1,
    userSelect: "none",
    animation: "fadeSlideUp 1s ease forwards",
    backgroundColor: "#fffcc7",
    padding: "clamp(12px, 4vw, 30px)",  // adjusted padding
    borderRadius: "20px",
    color: "white",
    border: "1px solid #fdf895ff",
  };

  // Slide container
  const slideOuterStyle = {
    flex:  "0 1 50%",  //changed from 300px → more flexible
    minWidth: "260px",
    width: "100%", // ensures full width on mobile
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "clamp(10px, 2vw, 30px) 0", // responsive vertical padding
  };

  const imgStyle = {
    width: "100%",
    maxWidth: "500px",  //increased from 450px
    height: "auto",
    maxHeight: "clamp(150px, 50vw, 500px)",  //reduced min height for mobiles
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
    userSelect: "none",
    pointerEvents: "none",
    zIndex: 7,
  };

  // Floating pyramid
  const floatingPyramidStyle = {
    position: "absolute",
    right: "clamp(10px, 8%, 80px)",  //adjusted spacing
    top: "-25px", //reduced from -35px → better fit on mobiles
    width: "clamp(80px, 15vw, 180px)",  //responsive range
    height: "clamp(80px, 15vw, 180px)", //responsive range
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 15,
    pointerEvents: "none",
    animation: "srpyramid 3.8s ease-in-out infinite",
  };

  // Text styles
  const smallLabelStyle = {
    fontFamily: "'Sora', sans-serif,",
    fontSize: "clamp(20px, 3vw, 36px)",   //responsive label
    // color: "#1b5e20",
    color:"#885804",
    marginBottom: "clamp(20px, 5vw, 50px)",  //responsive margin
    textAlign: "center", //centered on all screens
    userSelect: "none",
  };

  const headlineStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(18px, 4vw, 36px)",  //made smaller on mobile
    color: "#0f8d13",
    margin: "6px 0 12px 0", //adjusted margin
    fontWeight: "bold",
    lineHeight: "1.2",
    userSelect: "none",
  };

  const descStyle = {
    fontFamily: "'Sora', sans-serif",
    fontSize: "clamp(14px, 2vw, 18px)",  //responsive text
    color: "rgb(0,0,0)",
    marginBottom: "16px", //increased spacing
    lineHeight: "1.6", //improved readability
    userSelect: "none",
  };

  const ctaButtonStyle = {
    display: "inline-block",
    padding: "10px 20px",  //increased padding
    borderRadius: "50px",
    background: "#1b5e20",
    color: "white",
    fontSize: "clamp(12px, 2vw, 16px)",  //responsive text
    fontWeight: 600,  //increased weight
    textTransform: "uppercase",
    textDecoration: "none",
    border: "1px solid rgba(3, 90, 10, 1)",
    cursor: "pointer",
    userSelect: "none",

  };

  const navBtnCommon = {
    background: "rgba(0,0,0,0.4)",  //visibility
    border: "2px solid rgba(255,255,255,0.6)",
    padding: "clamp(6px, 2vw, 14px)",  //responsive
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "clamp(14px, 3vw, 22px)",  // responsive font size
    color: "#fff",
    userSelect: "none",
    zIndex:5,
  };

  return (
    <div style={outerWrapperStyle}>
      <style>{`
        @keyframes srpyramid {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          .inner-wrapper {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important; // reduced gap on small screens
            padding-bottom: 20px !important; /* consistent bottom padding */
            padding-top: 20px !important;    /* unified top padding */

          }
          .static-text-container {
            width: 100% !important;  // text full width on mobile
            max-width: 100% !important;  //max-width
            margin-bottom: 0px;  // removed extra margin
            order: 1; //text first

          }
          .slide-container {
            width: 100% !important;  // slide full width on mobile
            min-height: auto !important;
            padding: 12px 0 !important;  //reduced padding
            order: 2; //image second
          }
            
        }

        /* Move nav buttons to bottom row on small screens */
        @media (max-width: 600px) {
          .nav-buttons {
            top: auto !important;
            bottom: 10px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
            flex-direction: row !important;
             gap: 20px !important;
          }
        }
        
        /* Expand text width for large desktops */
        @media (min-width: 1200px) {
           .inner-wrapper {
          gap: 20px !important;
          }
          .static-text-container {
            max-width: 600px !important;
          }
        }
        
        @media (max-width: 320px) {
       .inner-wrapper {
        gap: 8px !important;
       padding: 12px !important;
       }
       .slide-container {
       padding: 8px 0 !important;
        }
       }

       @media (max-width: 480px) {
      .inner-wrapper {
      flex-direction: column !important;
      padding: 8px !important;
       gap: 6px !important;
      }
     .static-text-container {
      max-width: 100% !important;
      margin-bottom: 12px !important;
      font-size: clamp(14px, 3vw, 18px);
      }
      .slide-container img {
      max-width: 100% !important;
       height: auto !important;
     }
    }

        
      `}</style>
      <h2 style={smallLabelStyle}>Our Services</h2>
      <div style={innerWrapperStyle} className="inner-wrapper">
        <div style={staticTextContainer} className="static-text-container">
          <div style={headlineStyle}>{slides[current].title}</div>
          <div style={descStyle}>{slides[current].desc}</div>
         {/* <a href="#" target="_blank" rel="noreferrer" style={ctaButtonStyle}>
            Know More
          </a> */}
        </div>

        <div style={floatingPyramidStyle} aria-hidden="true" />

        <div style={slideOuterStyle} role="region" aria-roledescription="carousel" className="slide-container">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "opacity 520ms ease, transform 520ms ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              position: "relative",
            }}
          >
            <img src={slides[current].img} alt={slides[current].title} style={imgStyle} draggable={false} />
          </div>
        </div>

        <div className="nav-buttons"
          style={{
            position: "absolute",
            right: "4px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 5,
          }}
        >
          <button onClick={gotoNext} aria-label="Next slide" style={navBtnCommon}>
            ❯
          </button>
          <button onClick={gotoPrev} aria-label="Previous slide" style={navBtnCommon}>
            ❮
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderRevolutionReact;

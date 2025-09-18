
import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Slider from "react-slick";

import SliderRevolutionReact from "./carasoul_section"; 
import { FaMapMarkerAlt, FaEnvelope, FaPhone,  } from "react-icons/fa";
import Footer from "./Footer"; 
import "./HeroSection.css";

const images = [
  "/assets/biop.webp",
  "/assets/cont.jpg",
  "/assets/contact.jpg",
];

  const testimonials = [
    {
      text: "At Agrowmart Naturals, our vision is to connect farmers and consumers with pure, natural, and trustworthy products. We believe in empowering farmers, promoting sustainable agriculture, and delivering quality that reaches every home with care. Our journey is driven by a commitment to bring nature’s best closer to you.",
      name: "Avishkar Bansode",
      position:"Founder",
      image: "/assets/founder.enc"
    },
    // {
    //   text: "I’ve learned and grown so much here — truly a career-changing experience.",
    //   name: "Priya Sharma",
    //   position:"Founder",
    //   image: "/assets/owner.png"
    // },
    // {
    //   text: "Amazing workplace with great opportunities for growth and innovation.",
    //   name: "Amit Patel",
    //   position:"Co-founder",
    //   image: "/assets/owner.png"
    // }
  ];

  const cards = [
  { title: "Fertilizers", desc: "Boost your crop yield with quality fertilizers." },
  { title: "Organic Nutrients", desc: "Eco-friendly nutrients for healthy soil." },
  { title: "Specialty Products", desc: "Advanced solutions for better growth." },
  { title: "Soil Enhancers", desc: "Improve soil fertility for maximum harvest." },
  
];

const HeroSection = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-change carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse parallax mapping
  const xVideo = useTransform(mouseX, [0, windowSize.width], [-15, 15]);
  const yVideo = useTransform(mouseY, [0, windowSize.height], [-15, 15]);
  const xText = useTransform(mouseX, [0, windowSize.width], [-10, 10]);
  const yText = useTransform(mouseY, [0, windowSize.height], [-10, 10]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const GradientCircle = ({ size = "35vw", color1 = "rgba(0, 255, 227, 0.3)", color2 = "rgba(0, 255, 200, 0)" }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "5%",
        top: "10%",
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 65%, ${color2} 100%)`,
        borderRadius: "50%",
        zIndex: 1,
        pointerEvents: "none",
      }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    />
  );
};

  return (
    <>


      {/* HERO SECTION */}
      <section className="hero-container" id="Home" onMouseMove={handleMouseMove}>
        
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          style={{ x: xVideo, y: yVideo }}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: [200, -20, 0], opacity: 1 }}
          transition={{
            duration: 3.5,
            ease: "easeOut",
            times: [0, 0.7, 1],
            type: "spring",
            bounce: 0.8,
          }}
        >
          <source src="/assets/heropage1.mp4" type="video/mp4" />
        </motion.video>
        <div className="overlay"></div>
        <motion.div
          className="hero-content"
          style={{ x: xText, y: yText }}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: [-300, 20, -10, 0, 10, 0], opacity: 1 }}
          transition={{
            duration: 3,
            ease: "easeOut",
            times: [0, 0.25, 0.5, 0.75, 0.9, 1],
            bounce: 0.8,
          }}
        >
          <h1 className="hero-title">
            Welcome to <span className="highlight">AgrowMart</span>
          </h1>
          <p className="hero-subtitle">
            Connecting nature’s best with you, sustainably.
          </p>
        </motion.div>
      </section>

      {/* COMPANY SECTION */}
      <section className="company-section" id="company">
       
        <motion.div
          className="company-info"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
            
          <h2>About Our Company</h2>
          <p>
           Agrowmart Naturals
           India’s first all-in-one farm assistance & marketplace.
           The first digital platform dedicated to farmers’ growth.
           Serving farmers with all their daily agriculture needs.
           Real-time support with AI-driven solutions.
           Farmun – A smart buy & sell platform for farmers.
           Established in 2025 to shape the future of farming.
          </p>
        </motion.div>
        <div className="company-carousel">
          <AnimatePresence mode="wait">
            
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Company"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="carousel-image"
            />
          </AnimatePresence>
        </div>
       
      </section>

     {/* SLIDER SECTION */}
 <motion.div
      className="slider-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
    >
      <div className="gradient-circle" />
      <motion.div
        className="bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />
      <motion.img
        src="https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-a-small-plant-is-growing-in-dirt-patch-png-image_13103214.png"
        alt="Floating Shape"
        className="image1"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 4 }}
      >
        <motion.div
          className="text-group"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 0.3 }}
        >
          <motion.img
             src="https://png.pngtree.com/png-vector/20240715/ourmid/pngtree-a-small-plant-is-growing-in-dirt-patch-png-image_13103214.png"
            alt="Floating Shape 2"
            className="image-cube"
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* H1 Animation: From left → vibrate → bounce */}
          <motion.h1
            className="heading-white"
            initial={{ x: -200, opacity: 0 }}
             whileInView={{
           
              x: [ -200, 0, 0, -2, 2, -2, 2, 0, 0, 0, 0, 0 ], // slide in + vibrate
              opacity: [0, 1, 1],
              y: [0, 0, -10, 0, -10, 0], // bounce
            }}
            transition={{
              duration: 4,
              times: [0, 0.2, 0.4, 0.45, 0.5, 0.55, 0.6, 0.8, 0.9, 1],
              ease: "easeInOut",
            }}
           
        viewport={{ once: true }}
          >
            AgrowMart
          </motion.h1>

          <motion.h1
            className="heading-cyan"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{
              x: [ -200, 0, 0, -2, 2, -2, 2, 0, 0, 0, 0, 0 ],
              opacity: [0, 1, 1],
              y: [0, 0, -10, 0, -10, 0],
            }}
            transition={{
              duration: 8,
              times: [0, 0.2, 0.4, 0.45, 0.5, 0.55, 0.6, 0.8, 0.9, 1],
              ease: "easeInOut",
            }}
             viewport={{ twice: true }}
          >
             Transforming Farming Practices
          </motion.h1>

          {/* P Animation: From right → vibrate → bounce */}
          <motion.p
            className="description"
            initial={{ x: 200, opacity: 0 }}
            animate={{
              x: [ 200, 0, 0, -2, 2, -2, 2, 0, 0, 0, 0, 0 ],
              opacity: [0, 1, 1],
              y: [0, 0, -10, 0, -10, 0],
            }}
            transition={{
              duration: 8,
              times: [0, 0.2, 0.4, 0.45, 0.5, 0.55, 0.6, 0.8, 0.9, 1],
              ease: "easeInOut",
            }}
          >
            Agriculture is the backbone of India’s economy.
            Contributes ~18% of India’s GDP.
            Provides livelihood to over 50% of the population.
            Major source of food security and rural employment.
            Agro-based industries drive exports and trade growth.
            Strengthens allied sectors like dairy, poultry & fisheries.
            Plays a vital role in sustainable development of India.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>

   <section className="card-section" id="services">
  <h2 className="section-title">Our Products</h2>
  <div className="cards-wrapper">
    {cards.map((card, index) => (
      <motion.div
        key={index}
        className="interactive-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y / rect.height - 0.5) * 15).toFixed(2);
          const rotateY = ((x / rect.width - 0.5) * 15).toFixed(2);
          card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        }}
      >
        {/* Card Title */}
        <h3 className="card-title">{card.title}</h3>

        {/* Card Description */}
        <p className="card-desc">{card.desc}</p>

        {/* Get Catalogue Button */}
        <button
          className="card-btn"
          onClick={() => {
            // You can add your logic here, e.g., open PDF or navigate
            alert('Coming Soon');
          }}
        >
          Get Catalogue
        </button>
      </motion.div>
    ))}
  </div>
</section>

  <SliderRevolutionReact/>

      {/* TESTIMONIALS */}
    <section className="testimonials-section" id="careers">
     
      {/* Title */}
      <motion.div
        className="testimonials-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="testimonials-title" id="contact">Join Us</h3>
        <h2 className="testimonials-heading">Grow And Feed Your Career</h2>
      </motion.div>

      {/* Slider */}
      <motion.div
        className="testimonials-slider"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Slider {...sliderSettings}>
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <img src={t.image} alt={t.name} className="testimonial-img" />
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-position">{t.position}</span>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
       </section>

      <section className="contact-section"  id="contact">
      {/* Header */}
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="contact-subtitle">Get In Touch</h3>
        <h2 className="contact-title">We'd Love To Hear From You</h2>
      </motion.div>

      {/* Contact Details */}
      <motion.div
        className="contact-info-wrapper"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h4 className="contact-label">Our Office</h4>
          <p className="contact-detail">105-A, Raichandani 45 Baner Street, Opposite to Dmart Baner,<br/>Pune Maharashtra 411045. </p>
        </div>

        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h4 className="contact-label">Website</h4>
          <p className="contact-detail">www.agrowmartindia.com</p>
        </div>

        <div className="contact-card">
          <FaPhone className="contact-icon" />
          <h4 className="contact-label">Call Us</h4>
          <p className="contact-detail">+91 8007810076</p>
        </div>
      </motion.div>
    </section>
   
    <Footer />
    </>
  );
};

export default HeroSection;


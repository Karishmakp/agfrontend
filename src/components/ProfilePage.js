import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; 

export default function ProfilePage() {
  // Profile state (must be declared before any use of formData)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    profileImage: "", // default
  });

  // Suggest user's current city using Geolocation API
  useEffect(() => {
    if (!formData.location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use OpenStreetMap Nominatim reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            if (response.ok) {
              const data = await response.json();
              // Try to get city, town, or village
              const city = data.address.city || data.address.town || data.address.village || data.address.state || "";
              if (city) {
                setFormData((prev) => ({ ...prev, location: city }));
              }
            }
          } catch (err) {
            // Ignore geolocation errors
          }
        });
      }
    }
  }, [formData.location]);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username"); // logged in username

  // Example location suggestions (can be replaced with API or more cities)
  const locationSuggestions = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana"
  ];



  const [imageFile, setImageFile] = useState(null);

  // Fetch user details from backend when page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await fetch("http://localhost:4000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            location: data.location || "",
            profileImage:
              data.profileImage ||
              "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("accessToken");
    navigate("/"); // back to homepage
  };

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profile image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageURL = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageURL });
    }
  };

  // Save changes to backend
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("accessToken");

      // prepare form data
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("location", formData.location);
      if (imageFile) {
        form.append("profilePicture", imageFile); // backend expects 'profilePicture'
      }

      const response = await fetch("http://localhost:4000/auth/me", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Delete account handler with phone confirmation
  const handleDeleteAccount = async () => {
    const phone = prompt("To confirm deletion, please enter your phone number:");
    if (!phone) return;
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4000/auth/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        sessionStorage.clear();
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    
    <div
    style={{
    display: "flex",  //
    flexDirection: "column",  //
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
      }}>

  <div style={{ flex: 1 }}>
      {/* Top Banner */}
      <div style={{ width: "100%", position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt="banner"
          style={{
            width: "100%",
            height: "clamp(120px, 25vw, 200px)",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "90%",
          maxWidth: "1000px",
          margin: "clamp(-40px, -8vw, -60px) auto 20px auto",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          padding: "clamp(16px, 3vw, 24px)",
          // boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Profile Image + Name + Logout */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <motion.div
            initial={{ y: -40 }}
            whileHover={{ scale: 1.1, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: "relative",
              width: "clamp(80px, 15vw, 110px)",
              height: "clamp(80px, 15vw, 110px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgb(47,211,74)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <img
              src={formData.profileImage}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <motion.div
              whileHover={{ opacity: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                opacity: 0,
              }}
            >
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                ✎ Edit
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </motion.div>
          </motion.div>

          <div style={{ color: "#000", marginLeft: "20px" }}>
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                position: "relative",
                zIndex: 2,
                fontWeight: "600",
              }}
            >
              Hi, {username || "Guest"}
            </motion.h2>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "red", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              marginLeft: "auto",
              padding: "8px 16px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "white",
              color: "#000",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              alignSelf: "center",
            }}
          >
            Logout
          </motion.button>
        </div>

        {/* Form Section */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "10px",
          }}
          onSubmit={handleSave}
        >
          <div>
            <label style={{ color: "#000" }}>First Name</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "aqua" }}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ color: "#000" }}>Last Name</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "aqua" }}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ color: "#000" }}>Email ID</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "aqua" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ color: "#000" }}>Location</label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "aqua" }}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              style={inputStyle}
              list="location-suggestions"
            />
            <datalist id="location-suggestions">
              {locationSuggestions.map((loc) => (
                <option value={loc} key={loc} />
              ))}
            </datalist>
          </div>

          {/* Save Button */}
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgb(47,211,74)",
              color: "#000",
              borderColor: "#fff",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "20px",
              padding: "10px 18px",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "white",
              color: "#000",
              cursor: "pointer",
              fontWeight: "500",
              borderColor: "rgb(47,211,74)",
              fontSize: "clamp(16px, 2vw, 18px)",
              transition: "all 0.3s ease",
              gridColumn: "1 / -1",
              justifySelf: "center",
            }}
          >
            Save Changes
          </motion.button>
        </motion.form>

        {/* Delete Account Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "darkred", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDeleteAccount}
          style={{
            marginTop: "20px",
            padding: "10px 12px",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#c51313ff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "clamp(12px, 2vw, 16px)", //
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Delete Account
        </motion.button>
      </motion.div>
    </div>
    <Footer />
  </div>
  );
  
}

const inputStyle = {
  width: "100%",
  padding: "clamp(8px, 2vw, 12px)",  //responsive padding
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "4px",
  fontSize: "clamp(14px, 2vw, 16px)",    //responsive fontsize
  boxSizing: "border-box",
};

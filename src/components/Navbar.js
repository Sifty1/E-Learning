// Navbar.js

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/eschool.png";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    const navbar = document.querySelector('.navbar');
    if (!isDarkMode) {
      navbar.classList.add('dark-mode');
    } else {
      navbar.classList.remove('dark-mode');
    }
  };

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className={`navbar ${openLinks ? "active" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="leftside">
        <img src={logo} alt="E-School" />
      </div>
      <div className="rightside">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
        </button>
        <button className="toggle-button" onClick={toggleNavbar}>
          {openLinks ? <CloseIcon /> : <MenuIcon />}
        </button>
        <div className={`hiddenLinks ${openLinks ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/word">Word</Link> {/* Updated 'to' prop for Word component */}
          <Link to="/Dictionary">Dictionary</Link>
          <Link to="/book">Book</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/">Sign In</Link>
        </div>
        <Link to="/">Home</Link>
        <Link to="/word">Word</Link> {/* Updated 'to' prop for Word component */}
        <Link to="/Dictionary">Dictionary</Link>
        <Link to="/book">Book</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/">Sign In</Link>
      </div>
    </div>
  );
}

export default Navbar;

import React from 'react';
import './styles/navbar.css'; // We'll create this CSS file for NavBar styles
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/farmer.png"

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }
  return (
    <nav className="nav displayFlexRowSpc_BTN">
      <div id="home_icon" className="displayFlexRowSpc_BTN" onClick={handleClick}>
        <img src={logo} alt="Farm2Table Logo" /> {/* Replace with your logo path */}
        <h3>farm2table</h3>
      </div>
      <div className="displayFlexRowSpc_BTN" id="loginRoom">
        <h3>Login</h3>
        <h3>Register</h3>
      </div>
    </nav>
  );
};

export default NavBar;
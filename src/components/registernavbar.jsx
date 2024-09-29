import React from 'react';
import './styles/navbar.css'; // We'll create this CSS file for NavBar styles

const RegNavBar = () => {
  return (
    <nav className="nav displayFlexRowSpc_BTN">
      <div id="home_icon" className="displayFlexRowSpc_BTN">
        <img src="/images/pictures/logo.png" alt="Farm2Table Logo" /> {/* Replace with your logo path */}
        <h3>farm2table</h3>
      </div>
      <div className="displayFlexRowSpc_BTN" id="loginRoom">
        <h3>Login</h3>
      </div>
    </nav>
  );
};

export default RegNavBar;
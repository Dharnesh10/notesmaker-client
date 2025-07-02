// src/components/Header.js
import React from 'react';
import '../styles/Header.css';

const Header = ({ username, searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <h1 className="welcome">Hello, {username} 👋</h1>
      <input
        type="text"
        placeholder="Search subjects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </header>
  );
};

export default Header;

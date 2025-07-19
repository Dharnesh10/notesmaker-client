import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Sidebar.css';
import { FaBookOpen } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/logout',
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('username'); // if you store username
      navigate('/login'); // or wherever your login page is
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2><FaBookOpen/></h2>
        <h2>NotesMaker</h2>
      </div>
      <nav className="sidebar-nav">
        <div className="create-add-button">
            <Link to="/create-subject">Create Subject</Link>
            <Link to="/create-subject" className='add-symbol'>+</Link>
        </div>
        <Link to="/">Home</Link>
        <Link to="/chatbot">Chat Bot</Link>
        <Link to="/message">Message</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/unitconverter">Unit Converter</Link>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}><MdLogout/></button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        {/* <button className="logout-btn" onClick={handleLogout}>
          <MdLogout style={{ marginRight: '6px' }} /> Logout
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;

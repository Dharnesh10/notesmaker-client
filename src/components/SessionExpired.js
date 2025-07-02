import React from 'react';
import { Link } from 'react-router-dom';

const SessionExpired = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Session expired :)</h2>
      <Link to="/login" style={{ color: 'blue', textDecoration: 'underline', fontSize: '18px' }}>
        Go to login page
      </Link>
    </div>
  );
};

export default SessionExpired;

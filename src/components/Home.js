// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('Guest');
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then(res => setUsername(res.data.name))
      .catch(() => setUsername('User'));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/subjects', { withCredentials: true })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (subjectId) => {
    axios.delete(`http://localhost:5000/api/subjects/${subjectId}`, { withCredentials: true })
    .then(() => {
      setData(data.filter(subject => subject.id !== subjectId));
      setSubjectToDelete(null);
    })
    .catch(err => console.error(err));
  };

  const filteredData = data.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="welcome">Hello, {username} 👋</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="subjects-grid">
        {filteredData.length > 0 ? (
          filteredData.map((subject) => {
            const [date] = subject.created_at ? subject.created_at.split(' ') : ['-'];
            return (
              <div className="subject-card" key={subject.id}>
                <h2>{subject.title}</h2>
                <p className="created-date">Created: {date}</p>
                <div className="card-actions">
                  <a href={`/subjects/${subject.id}/topics`} className="home-view-btn">ViewTopics</a>
                  <button className="home-delete-btn" onClick={() => setSubjectToDelete(subject)}>Delete</button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">No subjects found.</div>
        )}
      </div>

      {subjectToDelete && (
        <div className="delete-overlay">
          <div className="delete-card">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{subjectToDelete.title}</strong>?</p>
            <div className="home-card-action-buttons">
                <button className='card-delete-btn' onClick={() => setSubjectToDelete(null)}>Cancel</button>
                <button className='card-confirm-btn' onClick={() => handleDelete(subjectToDelete.id)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

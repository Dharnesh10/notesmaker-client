import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/OnlineContentPage.css';

const OnlineContentPage = () => {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = () => {
    axios
      .get(`http://localhost:5000/api/subjects/topics/online`, {
        withCredentials: true,
      })
      .then((res) => {
        setTopics(res.data);
        handleSearch(search, res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = (query, data = topics) => {
    const filtered = data.filter((topic) =>
      topic.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(filtered);
    setSearch(query);
  };

  return (
    <div className="online-content-page">
      <div className="online-content-header">
        <h1 className="online-content-welcome">Search Topics Online 📚</h1>
        <div className="online-content-search-container">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="online-content-search-input"
          />
        </div>
      </div>

      <div className="online-content-subjects-grid">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <div className="online-content-subject-card" key={topic.id}>
              <h2 className="online-content-topic-title">{topic.title}</h2>
              <p className="online-content-topic-date">Created: {topic.created_at}</p>
              <div className="online-content-card-actions">
                <Link to={`/topics/${topic.id}/content`} className="online-content-view-btn">
                  View Topic
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="online-content-no-results">No topics found.</div>
        )}
      </div>
    </div>
  );
};

export default OnlineContentPage;

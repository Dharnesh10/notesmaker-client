import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Topics.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Topics = () => {
  const { subjectId } = useParams();
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [editingTopic, setEditingTopic] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [topicToDelete, setTopicToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, [subjectId]);


  const fetchTopics = () => {
    axios
      .get(`http://localhost:5000/api/subjects/${subjectId}/topics`, {
        withCredentials: true,
      })
      .then((res) => {
        setTopics(res.data);
        handleSearch(search, res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleCreate = () => {
    if (title.trim() === '') return;

    axios
      .post(
        `http://localhost:5000/api/subjects/${subjectId}/topics`,
        { title },
        { withCredentials: true }
      )
      .then(() => {
        setTitle('');
        fetchTopics();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/topics/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        fetchTopics();
        setTopicToDelete(null);
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

  const handleNavigate = (id) => {
    navigate(`/topics/${id}/notes`);
  };

  const handleEditClick = (topic) => {
    setEditingTopic(topic);
    setEditedTitle(topic.title);
  };

  const handleCancelEdit = () => {
    setEditingTopic(null);
    setEditedTitle('');
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() === '') return;

    axios
      .put(
        `http://localhost:5000/api/topics/${editingTopic.id}`,
        { title: editedTitle },
        { withCredentials: true }
      )
      .then(() => {
        fetchTopics();
        handleCancelEdit();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="topics-page">
      <h4 className="topics-title">TOPICS</h4>
      <input
        className="search-box"
        type="text"
        placeholder="Search topics"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="topics-list">
        <ol>
          {filteredTopics.map((topic) => (
            <li key={topic.id} className="topic-item">
              <Link to={`/topics/${topic.id}/notes`}>{topic.title}</Link>
              <div className="topic-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(topic)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="view-btn"
                  onClick={() => handleNavigate(topic.id)}
                >
                  View Notes
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setTopicToDelete(topic)}
                >
                  Delete <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="add-topic">
        <input
          type="text"
          placeholder="New Topic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate();
          }}
        />
        <button onClick={handleCreate}>
          <FaPlus />
        </button>
      </div>

      {/* EDIT OVERLAY */}
      {editingTopic && (
        <div className="edit-overlay">
          <div className="edit-card">
            <h3>Edit Topic</h3>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit topic name"
            />
            <div className="edit-buttons">
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
              <button className="save-btn" onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {topicToDelete && (
        <div className="delete-overlay">
          <div className="delete-card">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{topicToDelete.title}</strong>?</p>
            <div className="home-card-action-buttons">
                <button className='card-delete-btn' onClick={() => setTopicToDelete(null)}>Cancel</button>
                <button className='card-confirm-btn' onClick={() => handleDelete(topicToDelete.id)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topics;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Subjects.css'; // create this CSS file
import { FaPlus } from 'react-icons/fa'; 

const Subjects = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      setSuccess('Please enter a subject title.');
      return;
    }

    axios.post(
      'http://localhost:5000/api/subjects',
      { title },
      { withCredentials: true }
    )
      .then(() => {
        setSuccess('✅ Subject created successfully!');
        setTitle('');
        setTimeout(() => {
          setSuccess('');
          navigate('/');
        }, 2000); // 2s delay so user sees the message
      })
      .catch(err => {
        console.error(err);
        setSuccess('❌ Failed to create subject.');
      });
  };

  return (
    <div className="create-subject">
      <h2>Create a New Subject</h2>
      <input
        type="text"
        value={title}
        placeholder="Enter subject title"
        onChange={e => setTitle(e.target.value)}
        className="subject-input"
      />
      <button onClick={handleCreate} className="create-btn">
        + Create Subject
      </button>
      {success && <p className={`message ${success.includes('✅') ? 'success' : 'error'}`}>{success}</p>}
    </div>
  );
};

export default Subjects;

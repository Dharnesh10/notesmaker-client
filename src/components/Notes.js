import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Notes = () => {
  const { topicId } = useParams();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes`, {
      withCredentials: true,
    })
    .then(res => setNotes(res.data))
    .catch(err => console.error(err));
  }, [topicId]);

  const handleAdd = () => {
    axios.post(`http://localhost:5000/api/topics/${topicId}/notes`, { content }, {
      withCredentials: true,
    })
    .then(() => {
      setContent('');
      return axios.get(`http://localhost:5000/api/topics/${topicId}/notes`, {
        withCredentials: true,
      });
    })
    .then(res => setNotes(res.data))
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <textarea
        placeholder="Note content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleAdd}>Add Note</button>
    </div>
  );
};

export default Notes;

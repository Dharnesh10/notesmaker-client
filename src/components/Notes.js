import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Notes.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Notes = () => {
  const { topicId } = useParams();
  const [notes, setNotes] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [topicId]);

  const fetchNotes = () => {
    axios
      .get(`http://localhost:5000/api/topics/${topicId}/notes`, {
        withCredentials: true,
      })
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  };

  const handleCreate = () => {
    if (newContent.trim() === '') return;

    axios
      .post(
        `http://localhost:5000/api/topics/${topicId}/notes`,
        { content: newContent },
        { withCredentials: true }
      )
      .then(() => {
        setNewContent('');
        fetchNotes();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/topics/${topicId}/notes/${id}`, {
        withCredentials: true,
      })
      .then(() => fetchNotes())
      .catch((err) => console.error(err));
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setEditedContent(note.content);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditedContent('');
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() === '') return;

    axios
      .put(
        `http://localhost:5000/api/topics/${topicId}/notes/${editingNote.id}`,
        { content: editedContent },
        { withCredentials: true }
      )
      .then(() => {
        fetchNotes();
        handleCancelEdit();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="notes-page">
      <h4 className="notes-title">NOTES</h4>

      <div className="notes-list">
        <ol>
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <span>{note.content}</span>
              <div className="note-actions">
                <button className="edit-btn" onClick={() => handleEditClick(note)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(note.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="add-note">
        <input
          type="text"
          placeholder="New Note"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate();
          }}
        />
        <button onClick={handleCreate}>
          <FaPlus />
        </button>
      </div>

      {editingNote && (
        <div className="edit-overlay">
          <div className="edit-card">
            <h3>Edit Note</h3>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Edit note content"
              rows={5}
            />
            <div className="edit-buttons">
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
              <button className="save-btn" onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;

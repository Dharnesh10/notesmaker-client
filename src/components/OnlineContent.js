import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Notes.css';
import { FaTimes } from 'react-icons/fa';

const OnlineContent = () => {
  const { topicId } = useParams();
  const [notes, setNotes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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


  return (
    <div className="notes-page">
      <h4 className="notes-title">Content</h4>

      <div className="notes-list">
        <ol>
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-text">{note.content}</div>

              {note.image_path && (
                <div className="note-image-wrapper">
                  <img
                    src={`http://localhost:5000${note.image_path}`}
                    alt="Note"
                    className="note-image"
                    onClick={() => setSelectedImage(`http://localhost:5000${note.image_path}`)}
                  />
                  <div className="image-tooltip">Click to enlarge</div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged" />
            <button className="close-modal-btn" onClick={() => setSelectedImage(null)}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineContent;

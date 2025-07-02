import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Home from './components/Home';
import Topics from './components/Topics';
import Notes from './components/Notes';
import Subjects from './components/Subjects';
import ChatBot from './components/ChatBot';
import Message from './components/Message';
import SessionExpired from './components/SessionExpired';
import Calculator from './components/Calculator';
import UnitConverter from './components/UnitConverter';

// Simple fake auth checker (replace with your real auth logic)
const isAuthenticated = () => {
  return true;
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/session-expired" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/session-expired" element={<SessionExpired />} />

      {/* Protected */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="create-subject" element={<Subjects />} />
        <Route path="subjects/:subjectId/topics" element={<Topics />} />
        <Route path="topics/:topicId/notes" element={<Notes />} />
        <Route path='chatbot' element={<ChatBot />} />
        <Route path='message' element={<Message />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='unitconverter' element={<UnitConverter />} />
      </Route>

      {/* Redirect all unknown paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;

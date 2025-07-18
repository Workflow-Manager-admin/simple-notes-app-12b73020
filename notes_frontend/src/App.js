import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import MainLayout from './components/MainLayout';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root App Component for Simple Notes.
   * Handles light/dark theme, layout, and CRUD for notes (localStorage).
   */
  // -- THEME TOGGLE --
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // -- NOTES STATE (persist in localStorage) --
  const STORAGE_KEY = 'kavia-notes-v1';
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return [];
  });
  const [selectedId, setSelectedId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Persist to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Note Selection Handler
  const handleSelectNote = id => {
    setSelectedId(id);
    setIsAdding(false);
  };

  // Add Note (called from NoteEditor)
  const handleAddNote = note => {
    const id = `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newNote = { id, title: note.title || "", content: note.content || "" };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(id);
    setIsAdding(false);
  };

  // Edit/Save Note
  const handleSaveNote = updated => {
    setNotes(prev => prev.map(n =>
      n.id === selectedId ? { ...n, ...updated } : n
    ));
  };

  // Delete Note
  const handleDeleteNote = id => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // Add New Note Button
  const handleStartAdd = () => {
    setSelectedId(null);
    setIsAdding(true);
  };

  // Get selected note
  const selectedNote = notes.find(n => n.id === selectedId);

  // Responsive: if on mobile, collapse layout (handled in CSS).
  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Header />
      <MainLayout
        left={
          <div>
            <NoteList
              notes={notes}
              selectedId={selectedId}
              onSelect={handleSelectNote}
              onDelete={handleDeleteNote}
            />
            <div style={{margin: "12px", display:'flex', justifyContent:'center'}}>
              <button className="btn"
                onClick={handleStartAdd}
                style={{
                  width: '100%',
                  background: 'var(--accent, #ffeb3b)',
                  color: 'var(--primary, #1976d2)',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                + Add Note
              </button>
            </div>
          </div>
        }
        right={
          <NoteEditor
            selectedNote={isAdding ? null : selectedNote}
            onSave={handleSaveNote}
            onAdd={handleAddNote}
            isNew={isAdding}
          />
        }
      />
    </div>
  );
}

export default App;

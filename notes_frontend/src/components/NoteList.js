import React, { useState, useMemo } from 'react';
import './NoteList.css';

// PUBLIC_INTERFACE
function NoteList({ notes, selectedId, onSelect, onDelete }) {
  /**
   * Sidebar component to display the list of notes with real-time search.
   * @param {Array} notes - List of note objects [{id, title, content}]
   * @param {string} selectedId - The currently selected note id
   * @param {function} onSelect(id) - Callback when note is selected
   * @param {function} onDelete(id) - Callback when note is deleted
   */
  const [search, setSearch] = useState('');

  // Memoize filtered notes for performance
  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      n =>
        (n.title && n.title.toLowerCase().includes(q)) ||
        (n.content && n.content.toLowerCase().includes(q))
    );
  }, [notes, search]);

  return (
    <aside className="note-list">
      <h2 className="note-list-title">Your Notes</h2>
      <div style={{ padding: '0 16px 8px 16px' }}>
        <input
          type="text"
          className="note-search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search notes..."
          aria-label="Search notes"
          style={{
            width: '100%',
            padding: '0.5em 0.9em',
            marginBottom: 8,
            borderRadius: 7,
            border: '1.2px solid var(--border-color, #e9ecef)',
            background: 'var(--bg-secondary, #f8f9fa)',
            color: 'var(--text-primary, #282c34)',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <div className="note-list-scroll">
        {filteredNotes.length === 0 ? (
          <div className="note-list-empty">
            {notes.length === 0
              ? "No notes yet."
              : "No notes match your search."}
          </div>
        ) : (
          <ul>
            {filteredNotes.map(note => (
              <li
                key={note.id}
                className={note.id === selectedId ? 'selected' : ''}
                onClick={() => onSelect(note.id)}
              >
                <span className="note-title">{note.title || "Untitled"}</span>
                <button
                  className="note-delete-btn"
                  title="Delete note"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default NoteList;

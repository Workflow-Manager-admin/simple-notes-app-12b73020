import React from 'react';
import './NoteList.css';

// PUBLIC_INTERFACE
function NoteList({ notes, selectedId, onSelect, onDelete }) {
  /**
   * Sidebar component to display the list of notes.
   * @param {Array} notes - List of note objects [{id, title}]
   * @param {string} selectedId - The currently selected note id
   * @param {function} onSelect(id) - Callback when note is selected
   * @param {function} onDelete(id) - Callback when note is deleted
   */
  return (
    <aside className="note-list">
      <h2 className="note-list-title">Your Notes</h2>
      <div className="note-list-scroll">
        {notes.length === 0 ? (
          <div className="note-list-empty">No notes yet.</div>
        ) : (
          <ul>
            {notes.map(note => (
              <li key={note.id}
                  className={note.id === selectedId ? 'selected' : ''}
                  onClick={() => onSelect(note.id)}>
                <span className="note-title">{note.title || "Untitled"}</span>
                <button className="note-delete-btn"
                        title="Delete note"
                        onClick={e => {e.stopPropagation(); onDelete(note.id);}}>
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

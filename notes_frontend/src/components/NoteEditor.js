import React, { useState, useEffect } from 'react';
import './NoteEditor.css';

// PUBLIC_INTERFACE
function NoteEditor({ selectedNote, onSave, onAdd, onChange, isNew }) {
  /**
   * Editor/viewer for notes.
   * Renders editor if editing/adding note, or view if not.
   * @param selectedNote {id, title, content} - current note
   * @param onSave(note) - callback for save
   * @param onAdd(note) - callback for adding new note
   * @param onChange(field, value) - callback for field changes
   * @param isNew - whether this is a new note (adding)
   */

  // Always call hooks at the top level, never conditionally
  const [editMode, setEditMode] = useState(isNew || false);
  const [fields, setFields] = useState(selectedNote || { title: '', content: '' });

  // Update fields (and edit mode) whenever selectedNote or isNew changes
  useEffect(() => {
    if (isNew) {
      setEditMode(true);
      setFields({ title: '', content: '' });
    } else if (!selectedNote) {
      setEditMode(false);
      setFields({ title: '', content: '' });
    } else {
      setEditMode(false);
      setFields(selectedNote);
    }
    // eslint-disable-next-line
  }, [selectedNote, isNew]);

  // Handle controlled inputs
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: value,
    }));
    if (onChange) onChange(name, value);
  };

  const handleSave = () => {
    if (isNew && onAdd) {
      onAdd(fields);
      setFields({ title: '', content: '' });
    } else if (onSave) {
      onSave(fields);
    }
    setEditMode(false);
  };

  // Only show placeholder if no note selected and not adding
  if (!selectedNote && !isNew) {
    return (
      <section className="note-editor empty">
        <div className="note-editor-placeholder">Select a note from the list, or add a new note.</div>
      </section>
    );
  }

  return (
    <section className="note-editor">
      {(editMode || isNew) ? (
        <>
          <input
            data-testid="note-title-input"
            className="note-editor-title-input"
            type="text"
            placeholder="Title"
            name="title"
            value={fields.title}
            onChange={handleFieldChange}
            autoFocus
          />
          <textarea
            data-testid="note-content-input"
            className="note-editor-content-input"
            placeholder="Write your note here..."
            name="content"
            value={fields.content}
            onChange={handleFieldChange}
          ></textarea>
          <div className="note-editor-actions">
            <button
              className="btn note-save-btn"
              onClick={handleSave}
              disabled={!fields.title.trim() && !fields.content.trim()}
            >
              {isNew ? 'Add Note' : 'Save'}
            </button>
            {!isNew && (
              <button
                className="btn note-cancel-btn"
                onClick={() => {
                  setEditMode(false);
                  if (selectedNote) setFields(selectedNote);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2 className="note-editor-title">{fields.title || "Untitled"}</h2>
          <div className="note-editor-content">{fields.content || <em>(empty)</em>}</div>
          <div className="note-editor-actions">
            <button className="btn" onClick={() => setEditMode(true)}>
              Edit
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default NoteEditor;

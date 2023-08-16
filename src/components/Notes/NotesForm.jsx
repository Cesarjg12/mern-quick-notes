import React, { useState } from 'react';

function NotesForm({ onNoteAdded }) {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: noteText })
      });

      if (response.ok) {
        const newNote = await response.json();
        onNoteAdded(newNote); 
        setNoteText(''); 
      } else {
        console.error('Error adding note:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default NotesForm;
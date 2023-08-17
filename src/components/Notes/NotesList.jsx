import React, { useState, useEffect } from 'react';

function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const accessToken = localStorage.getItem('access_token'); 
        if (!accessToken) return; 

        const response = await fetch('/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Error fetching notes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div>
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note._id}>
              {note.text} - {new Date(note.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesList;
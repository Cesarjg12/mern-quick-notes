import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import NotesList from '../../components/Notes/NotesList';
import NotesForm from '../../components/Notes/NotesForm'; 

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);

  const handleNoteAdded = newNote => {
    setNotes([...notes, newNote]);
  };

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/notes" element={<NotesList notes={notes} onNoteAdded={handleNoteAdded} />} />
            </Routes>
            {/* Render the NotesForm component outside of the Routes */}
            <NotesForm onNoteAdded={handleNoteAdded} />
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

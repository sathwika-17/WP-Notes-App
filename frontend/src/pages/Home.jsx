import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import AddNote from "../components/AddNote";
import NoteCard from "../components/NoteCard";
import EditNote from "../components/EditNote";
import NoteDetail from "../components/NoteDetail";
import "./Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [detailNote, setDetailNote] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

 const fetchNotes = async () => {
   try {
     setLoading(true);

     let res;

     if (search.trim() === "") {
       res = await API.get(`/notes?sort=${sort}`);
     } else {
       res = await API.get(`/notes/search?q=${search}&sort=${sort}`);
     }

     setNotes(res.data);
   } catch (error) {
     console.log("Could not load notes", error);
   } finally {
     setLoading(false);
   }
 };

  useEffect(() => {
    fetchNotes();
  }, [search, sort]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="home">
        <div className="notes-section">
          <div className="notes-header">
            <div className="header-left">
              <h2>Your Notes</h2>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">Title (A-Z)</option>
                <option value="za">Title (Z-A)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="empty-message">Loading your notes...</p>
          ) : notes.length === 0 ? (
            <p className="empty-message">
              {search
                ? "No matching notes found."
                : "No notes yet. Create your first note!"}
            </p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  fetchNotes={fetchNotes}
                  setSelectedNote={setSelectedNote}
                  onOpenDetails={setDetailNote}
                />
              ))}
            </div>
          )}
        </div>

        <div className="add-note-section">
          <AddNote fetchNotes={fetchNotes} />
        </div>
      </div>

      {selectedNote && (
        <EditNote
          note={selectedNote}
          fetchNotes={fetchNotes}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {detailNote && (
        <NoteDetail note={detailNote} onClose={() => setDetailNote(null)} />
      )}
    </>
  );
}

export default Home;

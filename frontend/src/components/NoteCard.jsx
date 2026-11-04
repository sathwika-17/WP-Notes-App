import "./NoteCard.css";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaThumbtack } from "react-icons/fa";

function NoteCard({ note, fetchNotes, setSelectedNote, onOpenDetails }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const togglePin = async () => {
      try {
        await API.put(`/notes/${note._id}`, {
          isPinned: !note.isPinned,
        });

        toast.success(note.isPinned ? "Note unpinned" : "Note pinned");
        fetchNotes();
      } catch {
        toast.error("Could not update pin status");
      }
    };

    const deleteNote = async () => {
        try {
            await API.delete(`/notes/${note._id}`);
            setShowDeleteModal(false);
            toast.success("Note deleted successfully");
            fetchNotes();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete note");
        }
    };

    const openDetailsWithKeyboard = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpenDetails(note);
      }
    };

    return (
      <>
        <div className="note-card">
          <button
            className={`pin-icon-btn ${note.isPinned ? "pinned" : ""}`}
            onClick={togglePin}
            title={note.isPinned ? "Unpin note" : "Pin note"}
            aria-label={note.isPinned ? "Unpin note" : "Pin note"}
          >
            <FaThumbtack />
          </button>
          <div
            className="note-preview"
            role="button"
            tabIndex="0"
            onClick={() => onOpenDetails(note)}
            onKeyDown={openDetailsWithKeyboard}
            aria-label={`Open note: ${note.title}`}
          >
            <h3>{note.title}</h3>

            <p>{note.content}</p>
          </div>

          <div className="card-buttons">
            <button className="edit-btn" onClick={() => setSelectedNote(note)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>

        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Delete note?</h3>
              <p>
                This action cannot be undone. Are you sure you want to delete “
                {note.title}”?
              </p>

              <div className="delete-modal-actions">
                <button
                  className="cancel-delete-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button className="confirm-delete-btn" onClick={deleteNote}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default NoteCard;

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./NoteDetail.css";

function NoteDetail({ note, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const createdDate = note.createdAt
    ? new Date(note.createdAt).toLocaleString()
    : null;

  return (
    <div className="note-detail-overlay" onMouseDown={handleOverlayClick}>
      <section
        className="note-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-detail-title"
      >
        <div className="note-detail-header">
          <h2 id="note-detail-title">{note.title}</h2>
          <button
            className="close-note-detail-btn"
            type="button"
            onClick={onClose}
            aria-label="Close note details"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        {createdDate && <p className="note-detail-date">Created {createdDate}</p>}

        <p className="note-detail-content">{note.content}</p>
      </section>
    </div>
  );
}

export default NoteDetail;

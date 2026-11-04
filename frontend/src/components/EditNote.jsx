import { useState, useEffect } from "react";
import API from "../api/axios";
import "./EditNote.css";

function EditNote({ note, onClose, fetchNotes }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const updateNote = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/notes/${note._id}`, {
                title,
                content,
            });

            fetchNotes();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <h2>Edit Note</h2>

                <form onSubmit={updateNote}>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        rows="8"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditNote;
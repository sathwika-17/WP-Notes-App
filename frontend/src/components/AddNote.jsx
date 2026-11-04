import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import "./AddNote.css";

function AddNote({ fetchNotes }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await API.post("/notes", form);
      toast.success("Note added successfully");

      setForm({
        title: "",
        content: "",
      });

      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-note">
      <h2>Create New Note</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title..."
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          rows="6"
          placeholder="Write your note..."
          value={form.content}
          onChange={handleChange}
        />

        <button type="submit">{loading ? "Adding..." : "Add Note"}</button>
      </form>
    </div>
  );
}

export default AddNote;

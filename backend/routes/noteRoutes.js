import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
} from "../controllers/noteController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.get("/search", protect, searchNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;

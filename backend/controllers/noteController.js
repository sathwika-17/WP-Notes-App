import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    let sortOption = { isPinned: -1, createdAt: -1 };

    switch (req.query.sort) {
      case "oldest":
        sortOption = { isPinned: -1, createdAt: 1 };
        break;

      case "az":
        sortOption = { isPinned: -1, title: 1 };
        break;

      case "za":
        sortOption = { isPinned: -1, title: -1 };
        break;

      default:
        sortOption = { isPinned: -1, createdAt: -1 };
    }

    const notes = await Note.find({
      user: req.user._id,
    }).sort(sortOption);

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    
    if (typeof isPinned === "boolean") {
      note.isPinned = isPinned;
    }

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchNotes = async (req, res) => {
  try {
    const q = req.query.q || "";

    let sortOption = { isPinned: -1, createdAt: -1 };

    switch (req.query.sort) {
      case "oldest":
        sortOption = { isPinned: -1, createdAt: 1 };
        break;

      case "az":
        sortOption = { isPinned: -1, title: 1 };
        break;

      case "za":
        sortOption = { isPinned: -1, title: -1 };
        break;

      default:
        sortOption = { isPinned: -1, createdAt: -1 };
    }

    const notes = await Note.find({
      user: req.user._id,
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          content: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }).sort(sortOption);

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

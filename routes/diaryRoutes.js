import { Router } from "express";
import { 
  listEntries, 
  createEntry, 
  getEntryById, 
  updateEntry, 
  deleteEntry, 
  renderNewForm, 
  renderEditForm,
  redirectToIndex
} from "../controllers/diary.js";

const router = Router();

// List all diary entries
router.get("/diary", listEntries);

// List all diary entries
router.get("/index", redirectToIndex);

// Show new entry form
router.get("/diary/new", renderNewForm);

// Create new entry
router.post("/diary", createEntry);

// Show single entry
router.get("/diary/:id", getEntryById);

// Show edit form
router.get("/diary/:id/edit", renderEditForm);

// Update entry
router.put("/diary/:id", updateEntry);

// Delete entry
router.delete("/diary/:id", deleteEntry);

export default router;

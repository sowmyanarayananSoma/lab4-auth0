import DiaryEntry from "../models/diary.js";

export async function listEntries(req, res) {
  try {
    const entries = await DiaryEntry.find().sort({ date: -1 });
    res.render("diary/index", { title: "My Secret Diary", entries });
  } catch (error) {
    console.error("Failed to fetch diary entries:", error);
    res.status(500).send("Failed to fetch diary entries");
  }
}

export async function createEntry(req, res) {
  try {
    const { title, content, mood, isPrivate } = req.body;
    await DiaryEntry.create({ 
      title, 
      content, 
      mood,
      username: 'anonymous@unknown.com',
      isPrivate: isPrivate === 'on',
      date: new Date()
    });
    res.redirect("/diary");
  } catch (err) {
    console.error("Error creating diary entry:", err);
    res.status(400).render("diary/new", { 
      title: "New Entry",
      error: "Error creating diary entry" 
    });
  }
}

export async function getEntryById(req, res) {
  try {
    const entry = await DiaryEntry.findById(req.params.id);
    if (!entry) return res.status(404).send("Entry not found");
    res.render("diary/view", { 
      title: entry.title,
      entry 
    });
  } catch (err) {
    console.error("Error fetching entry:", err);
    res.status(500).send("Error fetching diary entry");
  }
}

export async function updateEntry(req, res) {
  try {
    const { title, content, mood, isPrivate } = req.body;
    const updated = await DiaryEntry.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        mood,
        isPrivate: isPrivate === 'on',
        lastModified: Date.now()
      },
      { new: true }
    );
    if (!updated) return res.status(404).send("Entry not found");
    res.redirect(`/diary/${updated._id}`);
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(400).render("diary/edit", { 
      title: "Edit Entry",
      entry: req.body,
      error: "Error updating diary entry" 
    });
  }
}

export async function deleteEntry(req, res) {
  try {
    const deleted = await DiaryEntry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Entry not found");
    res.redirect("/diary");
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).send("Error deleting diary entry");
  }
}

export function renderNewForm(req, res) {
  res.render("diary/new", { 
    title: "New Entry",
    entry: { mood: 'other' } // Default values
  });
}

export async function renderEditForm(req, res) {
  try {
    const entry = await DiaryEntry.findById(req.params.id);
    if (!entry) return res.status(404).send("Entry not found");
    res.render("diary/edit", { 
      title: "Edit Entry",
      entry 
    });
  } catch (err) {
    console.error("Error fetching entry for edit:", err);
    res.status(500).send("Error loading edit form");
  }
}


export async function redirectToIndex(req, res) {
  try {
   
    res.render("/index", { 
      title: "Edit Entry",
      entry 
    });
  } catch (err) {
    console.error("Error fetching entry for edit:", err);
    res.status(500).send("Error loading edit form");
  }
}

import express from "express";
import Timesheet from "../model/timesheetModel.js";

const router = express.Router();

router.post("/timesheetSubmit", async (req, res) => {
  const {
    userId,
    projectId,
    date,
    task,
    progress,
    hoursWorked,
    description,
    status,
  } = req.body;

  if (!userId || !projectId || !date || !hoursWorked) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (status && !["draft", "submitted"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Invalid status. Must be 'draft' or 'submitted'." });
  }

  try {
    const existing = await Timesheet.findOne({ userId, date: new Date(date) });

    const entry = { projectId, task, progress, hoursWorked, description };

    let timesheet;

    if (existing) {
      existing.entries.push(entry);
      existing.status = status || existing.status;
      if (status === "submitted") {
        existing.submittedAt = new Date();
      }
      timesheet = await existing.save();
    } else {
      timesheet = new Timesheet({
        userId,
        date: new Date(date),
        entries: [entry],
        status: status || "draft",
        submittedAt: status === "submitted" ? new Date() : null,
      });
      await timesheet.save();
    }

    const message =
      timesheet.status === "submitted"
        ? "Timesheet submitted successfully."
        : "Timesheet saved as draft.";

    res.status(201).json({ message, timesheet });
  } catch (err) {
    console.error("Error saving timesheet:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/getTimesheets", async (req, res) => {
  const { userId, projectId, date, status } = req.query;

  const filter = {};

  if (userId) filter.userId = userId;
  if (projectId) filter.projectId = projectId;
  if (date) filter.date = date;
  if (status) filter.status = status;

  try {
    const timesheets = await Timesheet.find(filter).sort({ date: -1 }); // newest first
    res.status(200).json(timesheets);
  } catch (err) {
    console.error("Error fetching timesheets:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

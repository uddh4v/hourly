import express from "express";
import Timesheet from "../model/timesheetModel.js";

const router = express.Router();

router.post("/timesheetSubmit", async (req, res) => {
  const { userId, projectId, date, hoursWorked, description, status } =
    req.body;

  if (!userId || !projectId || !date || !hoursWorked) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (status && !["draft", "submitted"].includes(status)) {
    return res
      .status(400)
      .json({ error: "Invalid status. Must be 'draft' or 'submitted'." });
  }

  try {
    const timesheet = new Timesheet({
      userId,
      projectId,
      date,
      hoursWorked,
      description,
      status: status || "draft", // default to draft if not provided
      submittedAt: status === "submitted" ? new Date() : null,
    });

    const saved = await timesheet.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving timesheet:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});
export default router;

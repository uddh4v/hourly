import express from "express";
import Project from "../model/projectModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, clientName, description, status } = req.body;
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res
        .status(400)
        .json({ status: "failed", message: `${name} project already exists` });
    }
    const newProject = await Project.create({
      name,
      clientName,
      description,
      status,
    });
    res
      .status(201)
      .json({ status: "success", message: "Project created", newProject });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Server error", error: err.message });
  }
});
export default router;

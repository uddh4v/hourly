import express from "express";
import Project from "../model/projectModel.js";
import User from "../model/userModal.js";

const router = express.Router();

router.post("/createProject", async (req, res) => {
  try {
    const { projectName, clientName, description, status, projectManager } =
      req.body;
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return res.status(400).json({
        status: "failed",
        message: `${projectName} project already exists`,
      });
    }
    const manager = await User.findOne({
      _id: projectManager, // assuming you're sending manager's ID
      role: "manager",
    });

    if (!manager) {
      return res.status(400).json({
        status: "failed",
        message: "Project manager must be a valid user with role 'manager'",
      });
    }
    const newProject = await Project.create({
      projectName,
      clientName,
      description,
      status,
      projectManager,
    });
    res
      .status(201)
      .json({ status: "success", message: "Project created", newProject });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
});
export default router;

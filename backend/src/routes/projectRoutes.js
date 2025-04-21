import express from "express";
import Project from "../model/projectModel.js";
import User from "../model/userModal.js";

const router = express.Router();

router.get("/getAllProjects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      status: "success",
      message: "Projects fetched Successfully",
      projects,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
});

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
    // Validate projectManager exists and is a manager
    const manager = await User.findOne({
      _id: projectManager,
      role: "manager",
    });
    if (!manager) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid project manager. Must be a user with manager role.",
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

router.get("/assignedProject/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "projects",
      "projectName clientName  description projectManager"
    );

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      messgae: "Project fetched successfully",
      projects: user.projects,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});
export default router;

import express from "express";
import Project from "../model/projectModel.js";

const router = express.Router();

router.post("/createProject", async (req, res) => {
  try {
    const {
      projectName,
      clientName,
      description,
      status,
      projectManager,
      deliveryManager,
    } = req.body;
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return res.status(400).json({
        status: "failed",
        message: `${projectName} project already exists`,
      });
    }
    const newProject = await Project.create({
      projectName,
      clientName,
      description,
      status,
      projectManager,
      deliveryManager,
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

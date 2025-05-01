import Project from '../models/Project.js';
import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const createProject = async (req, res) => {
  console.log('Create project body:', req.body);
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Project title is required' });
    }
    const project = new Project({
      title: title.trim(),
      user: req.user.id,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('Create project error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    console.error('Get projects error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProject = async (req, res) => {
  console.log('Update project body:', req.body);
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Project title is required' });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this project' });
    }
    project.title = title.trim();
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    console.error('Update project error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this project' });
    }
    await Task.deleteMany({ project: id });
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project and associated tasks deleted' });
  } catch (err) {
    console.error('Delete project error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};
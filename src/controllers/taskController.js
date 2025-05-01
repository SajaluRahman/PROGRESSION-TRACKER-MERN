import Task from '../models/Task.js';
import Project from '../models/Project.js';
import mongoose from 'mongoose';

export const createTask = async (req, res) => {
  console.log('Create task body:', req.body);
  try {
    const { title, description, status, project } = req.body;
    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project ID are required' });
    }
    if (!mongoose.isValidObjectId(project)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (projectExists.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to add tasks to this project' });
    }
    const task = new Task({
      title: title.trim(),
      description: description || '',
      status: status || 'To Do',
      project,
      user: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { project } = req.query;
    if (!project || !mongoose.isValidObjectId(project)) {
      return res.status(400).json({ message: 'Valid project ID is required' });
    }
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (projectExists.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to view tasks for this project' });
    }
    const tasks = await Task.find({ project, user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  console.log('Update task body:', req.body);
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this task' });
    }
    task.title = title.trim();
    task.description = description || '';
    task.status = status || task.status;
    if (status === 'Done' && !task.completedAt) {
      task.completedAt = new Date();
    } else if (status !== 'Done') {
      task.completedAt = null;
    }
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.error('Update task error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json ({ message: 'Unauthorized to delete this task' });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete task error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};
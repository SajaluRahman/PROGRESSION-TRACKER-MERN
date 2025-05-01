import express from 'express';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes with authentication
router.use(authMiddleware);

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
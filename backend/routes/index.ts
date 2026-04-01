import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import projectRoutes from './projectRoutes.js';
import taskRoutes from './taskRoutes.js';
import workerRoutes from './workerRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = Router();

router.get('/users', getUsers);

router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/workers', workerRoutes);
router.use('/ai', aiRoutes);

export default router;

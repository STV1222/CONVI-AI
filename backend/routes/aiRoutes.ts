import { Router } from 'express';
import { allocateWorkers } from '../controllers/aiController.js';

const router = Router();

router.post('/allocate-workers', allocateWorkers);

export default router;

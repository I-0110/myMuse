import { Router } from 'express';
import postRoutes from './postRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

export default router;


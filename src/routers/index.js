

import { Router } from 'express';
import apartmentsRouter from './apartments.js';
import authRouter from './auth.js';

const router = Router();

router.use('/apartments', apartmentsRouter);
router.use('/auth', authRouter);

export default router;



import { Router } from 'express';
import apartmentsRouter from './apartments.js';
import authRouter from './auth.js';
import usersRouter from './users.js';

const router = Router();

router.use('/apartments', apartmentsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;

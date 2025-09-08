import { Router } from 'express';
import apartmentsRouter from './apartments.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import readingsRouter from './readings.js';

const router = Router();

router.use('/apartments', apartmentsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/readings', readingsRouter);

export default router;

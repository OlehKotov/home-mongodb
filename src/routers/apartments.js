import { Router } from 'express';
import {
  getApartmentByIdController,
  getApartmentsController,
} from '../controllers/apartments.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getApartmentsController));
router.get('/:apartmentId', ctrlWrapper(getApartmentByIdController));

export default router;

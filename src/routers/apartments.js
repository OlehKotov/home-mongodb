import { Router } from 'express';
import {
  getApartmentByIdController,
  getApartmentsController,
} from '../controllers/apartments.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getApartmentsController));
router.get('/:apartmentId', ctrlWrapper(getApartmentByIdController));

export default router;

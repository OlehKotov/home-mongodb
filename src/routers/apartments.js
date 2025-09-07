import { Router } from 'express';
import {
  getApartmentByIdController,
  getApartmentsController,
} from '../controllers/apartments.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getApartmentsController));
router.get('/:apartmentId', checkRoles(ROLES.ADMIN), ctrlWrapper(getApartmentByIdController));

export default router;

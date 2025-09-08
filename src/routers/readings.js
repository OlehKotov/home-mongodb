import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { getReadingsController, updateReadingsController } from '../controllers/readings.js';

const router = Router();

router.use(authenticate);


router.get("/:apartmentId", checkRoles(ROLES.OWNER), ctrlWrapper(getReadingsController));
router.patch("/:apartmentId", checkRoles(ROLES.OWNER), ctrlWrapper(updateReadingsController));

export default router;
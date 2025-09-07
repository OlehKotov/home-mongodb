import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  patchUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { updateUserSchema } from '../validation/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();
router.use(authenticate);

router.get('/', checkRoles(ROLES.ADMIN),  ctrlWrapper(getUsersController));
router.get('/:userId', checkRoles(ROLES.ADMIN),  isValidId, ctrlWrapper(getUserByIdController));

router.delete('/:userId', checkRoles(ROLES.ADMIN),  isValidId, ctrlWrapper(deleteUserController));
router.patch(
  '/:userId',
  checkRoles(ROLES.ADMIN, ROLES.OWNER), 
  isValidId,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;

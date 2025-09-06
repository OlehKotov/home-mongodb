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

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getUsersController));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.delete('/:userId', isValidId, ctrlWrapper(deleteUserController));
router.patch(
  '/:userId',
  isValidId,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  loginUserController,
  logoutUserController,
  patchUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { updateUserSchema } from '../validation/user.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));


router.delete('/:userId', isValidId, ctrlWrapper(deleteUserController));
router.patch(
  '/:userId',
  isValidId,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;

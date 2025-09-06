import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  // deleteUserController,
  // getUserByIdController,
  // getUsersController,
  loginUserController,
  logoutUserController,
  // patchUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
// import { isValidId } from '../middlewares/isValidId.js';
// import { updateUserSchema } from '../validation/user.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

// router.get('/', authenticate, ctrlWrapper(getUsersController));
// router.get(
//   '/:userId',
//   authenticate,
//   isValidId,
//   ctrlWrapper(getUserByIdController),
// );

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
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

// router.delete(
//   '/:userId',
//   authenticate,
//   isValidId,
//   ctrlWrapper(deleteUserController),
// );
// router.patch(
//   '/:userId',
//   authenticate,
//   isValidId,
//   validateBody(updateUserSchema),
//   ctrlWrapper(patchUserController),
// );

export default router;

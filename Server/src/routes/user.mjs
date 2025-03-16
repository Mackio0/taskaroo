import { Router } from 'express';
import {
  userIndex,
  userRegisterController,
} from '../controllers/userController.mjs';
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';

const router = Router();

router.get('/api/users', userIndex);
router.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  userRegisterController
);

export default router;

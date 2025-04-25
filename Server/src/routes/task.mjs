import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/taskController.mjs';
import ensureAuth from '../middlewares/ensureAuth.mjs';
import { body, checkSchema } from 'express-validator';
import { createTaskValidationSchema } from '../utils/validationSchemas.mjs';
import ensureTaskOwnership from '../middlewares/ensureTaskOwnership.mjs';

const router = Router();

router.post(
  '/api/tasks',
  ensureAuth,
  checkSchema(createTaskValidationSchema),
  createTask
);
router.get('/api/tasks', ensureAuth, getTasks);
router.get('/api/tasks/:id', ensureAuth, ensureTaskOwnership, getTask);
router.put('/api/tasks/:id', ensureAuth, ensureTaskOwnership, updateTask);
router.delete('/api/tasks/:id', ensureAuth, ensureTaskOwnership, deleteTask);

export default router;

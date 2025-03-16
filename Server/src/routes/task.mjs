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

const router = Router();

router.post(
  '/api/tasks',
  ensureAuth,
  checkSchema(createTaskValidationSchema),
  createTask
);
router.get('/api/tasks', getTasks);
router.get('/api/tasks/:id', getTask);
router.put('/api/tasks/:id', updateTask);
router.delete('/api/tasks/:id', deleteTask);

export default router;

import { Router } from 'express';
import {
  authStatusController,
  loginController,
  logoutController,
} from '../controllers/authController.mjs';
import '../strategies/local-strategy.mjs';
import passport from 'passport';
import { useErrorHandler } from '../utils/helpers.mjs';

const router = Router();

router.post('/api/auth/login', passport.authenticate('local'), loginController);
router.get('/api/auth/status', authStatusController);
router.post('/api/auth/logout', logoutController);

export default router;

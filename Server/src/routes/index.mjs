import { Router } from "express";
import authRouter from './auth.mjs'
import userRouter from './user.mjs'
import taskRouter from './task.mjs'

const router = Router();

router.use(authRouter)
router.use(userRouter)
router.use(taskRouter)

export default router
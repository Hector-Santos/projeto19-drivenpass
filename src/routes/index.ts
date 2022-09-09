import { Router } from 'express';
import questionRouter from './questionRouter';

const router = Router();
router.use(questionRouter);

export default router;

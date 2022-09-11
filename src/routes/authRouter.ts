import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { authSchema } from '../schemas/authSchema.js';

const authRouter = express.Router();
authRouter.post("/signup", (req, res, next) => validate(req, res, next, authSchema), signUp);
authRouter.post("/signin", (req, res, next) => validate(req, res, next, authSchema), signIn);


export default authRouter
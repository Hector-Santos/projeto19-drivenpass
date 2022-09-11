import express from 'express';
import { createCredential } from '../controllers/credentialsController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { credentialsSchema } from '../schemas/credentialsSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const credentialsRouter = express.Router();
credentialsRouter.post("/createcredential", (req, res, next) => validate(req, res, next, credentialsSchema), verifyToken, createCredential);


export default credentialsRouter
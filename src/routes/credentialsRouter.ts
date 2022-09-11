import express from 'express';
import { createCredential, deleteCredential, findCredential, findCredentials } from '../controllers/credentialsController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { credentialsSchema } from '../schemas/credentialsSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const credentialsRouter = express.Router();
credentialsRouter.post("/credentials/create", (req, res, next) => validate(req, res, next, credentialsSchema), verifyToken, createCredential);
credentialsRouter.get("/credentials/find", verifyToken, findCredentials);
credentialsRouter.get("/credentials/find/:id", verifyToken, findCredential);
credentialsRouter.delete("/credentials/delete/:id", verifyToken, deleteCredential);


export default credentialsRouter
import express from 'express';
import { createCard, deleteCard, findCard, findCards } from '../controllers/cardsController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { cardsSchema } from '../schemas/cardsSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const cardsRouter = express.Router();
cardsRouter.post("/cards/create", (req, res, next) => validate(req, res, next, cardsSchema), verifyToken, createCard);
cardsRouter.get("/cards/find", verifyToken, findCards);
cardsRouter.get("/cards/find/:id", verifyToken, findCard);
cardsRouter.delete("/cards/delete/:id", verifyToken, deleteCard);


export default cardsRouter
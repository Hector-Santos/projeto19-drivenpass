import express from 'express';
import { createNote, deleteNote, findNote, findNotes } from '../controllers/notesController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { notesSchema } from '../schemas/notesSchema.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const notesRouter = express.Router();
notesRouter.post("/notes/create", (req, res, next) => validate(req, res, next, notesSchema), verifyToken, createNote);
notesRouter.get("/notes/find", verifyToken, findNotes);
notesRouter.get("/notes/find/:id", verifyToken, findNote);
notesRouter.delete("/notes/delete/:id", verifyToken, deleteNote);


export default notesRouter
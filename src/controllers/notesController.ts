import { Request, Response } from 'express';
import { INoteInsertData } from '../types/notesTypes.js';
import { createNote as createNoteService} from '../services/notesService.js';
import { findNote as findNoteService,
         findNotes as findNotesService,
         deleteNote as deleteNoteService} from '../services/notesService.js';

export async function createNote(req:Request, res:Response) {
  const note:INoteInsertData = req.body;
  await createNoteService(note)      
  res.sendStatus(201);
}

export async function findNote(req:Request, res:Response) {
  const noteId:number = Number(req.params.id);
  const userId:number = res.locals.id
  const note = await findNoteService(noteId, userId)      
  res.status(200).send(note);
}

export async function findNotes(req:Request, res:Response) {
  const userId:number = res.locals.id
  const notes = await findNotesService(userId)      
  res.status(200).send(notes)
}

export async function deleteNote(req:Request, res:Response) {
  const noteId:number = Number(req.params.id);
  const userId:number = res.locals.id
  await deleteNoteService(noteId, userId)      
  res.sendStatus(200);
}
import { insert,
         findByTitleAndId,
         findById as findNoteById,
         findAll as findAllNotes, 
         remove} from "../repositories/notesRepository.js";
import { INoteInsertData, INotesReturnData, INoteReturnData} from "../types/notesTypes.js";
import { findById as findUserById } from "../repositories/usersRepository.js";


export async function createNote(noteData: INoteInsertData){
  const user = await findUserById(noteData.userId)
	if(!user) throw {type: 'not_found', message: 'a user with the provided id could not be found'}

  const titleExists = await findByTitleAndId(noteData.title, noteData.userId)
	if(titleExists) throw {type: 'conflict', message: 'the provided title is already in use'}

  await insert(noteData)
}


export async function findNote(noteId: number, userId:number){

  const note = await findNoteById(noteId)
	if(!note)
  throw {type: 'not_found',
         message: 'a note with the provided id could not be found'}

  const noteOwnerId = note.userId
  if(noteOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the note you are triyng to reach belongs to another user'}
  
  const returnNote:INoteReturnData = { 
  title: note.title,  
  note:  note.note   
  }

  return returnNote
  
}

export async function findNotes(userId:number){
  const notes = await findAllNotes(userId)
  if(notes.length === 0)
  throw {type: 'not_found', message: 'this user has no notes registered'}
	if(!notes)
  throw {type: 'not_found', message: 'the notes information could not be retrievd'}
    
  const returnNotes:INotesReturnData[] = notes.map(note => { return { 
    id:    note.id,
    title: note.title,  
    note:  note.note   
    }})
  
    return returnNotes
  
}

export async function deleteNote(noteId: number, userId:number){

  const note = await findNoteById(noteId)
	if(!note)
  throw {type: 'not_found',
         message: 'a note with the provided id could not be found'}

  const noteOwnerId = note.userId
  if(noteOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the note you are triyng to delete belongs to another user'}

  await remove(noteId)
}


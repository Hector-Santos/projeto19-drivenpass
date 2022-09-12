import { prisma } from "../config/database.js"
import {INoteInsertData} from "../types/notesTypes.js"



export async function insert(noteData: INoteInsertData) {
    await prisma.notes.create({
        data: noteData
    });
  }

  export async function findByTitleAndId(title:string, userId:number) {
    const note = await prisma.notes.findUnique({
      where :{userId_title:{
        userId,title
      }}
   })
     return note
   }

   export async function findById(id:number) {
    const note = await prisma.notes.findUnique({
        where :{id}
     }
     );
     return note
   }

   export async function findAll(userId:number) {
    const notes = await prisma.notes.findMany({
        where :{userId}
     }
     );
     return notes
   }

   export async function remove(id:number) {
    const note = await prisma.notes.delete({
        where :{id}
     }
     );
     return note
   }
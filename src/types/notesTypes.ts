import { notes } from "@prisma/client";

export type INoteInsertData = Omit<notes, 'id'>;
export type INoteReturnData = Omit<notes, 'id' | 'userId'>
export type INotesReturnData = Omit<notes,'userId'>
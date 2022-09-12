import { cards } from "@prisma/client";

export type ICardInsertData = Omit<cards, 'id'>;
export type ICardReturnData = Omit<cards, 'id' | 'userId'>
export type ICardsReturnData = Omit<cards,'userId'>
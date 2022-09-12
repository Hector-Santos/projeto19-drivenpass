import { prisma } from "../config/database.js"
import {ICardInsertData} from "../types/cardsTypes.js"



export async function insert(cardData: ICardInsertData) {
    await prisma.cards.create({
        data: cardData
    });
  }

  export async function findByTagAndId(tag:string, userId:number) {
    const card = await prisma.cards.findUnique({
      where :{userId_tag:{
        userId,tag
      }}
   })
     return card
   }

   export async function findById(id:number) {
    const card = await prisma.cards.findUnique({
        where :{id}
     }
     );
     return card
   }

   export async function findAll(userId:number) {
    const cards = await prisma.cards.findMany({
        where :{userId}
     }
     );
     return cards
   }

   export async function remove(id:number) {
    const card = await prisma.cards.delete({
        where :{id}
     }
     );
     return card
   }
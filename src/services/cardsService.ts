import { insert,
         findByTagAndId,
         findById as findCardById,
         findAll as findAllCards, 
         remove} from "../repositories/cardsRepository.js";
import { ICardInsertData, ICardReturnData, ICardsReturnData } from "../types/cardsTypes.js";
import Cryptr from "cryptr";
import dotenv from 'dotenv'
import { findById as findUserById } from "../repositories/usersRepository.js";

dotenv.config()

const ENCRYPTION_KEY:string  = process.env.ENCRYPTION_KEY || "key"
const cryptr = new Cryptr(ENCRYPTION_KEY)

export async function createCard(cardData: ICardInsertData){
  
  const encryptedPassword = cryptr.encrypt(cardData.password)

  const encryptedCvc = cryptr.encrypt(cardData.cvc)

  const user = await findUserById(cardData.userId)
	if(!user) throw {type: 'not_found', message: 'a user with the provided id could not be found'}

  const tagExists = await findByTagAndId(cardData.tag, cardData.userId)
	if(tagExists) throw {type: 'conflict', message: 'the provided tag is already in use'}

  const encryptedCardData:ICardInsertData =
   {
    userId: cardData.userId,
    nameOnCard: cardData.nameOnCard,
    tag:cardData.tag,
    cardNumber: cardData.cardNumber,
    cvc: encryptedCvc,
    password:encryptedPassword,
    isVirtual: cardData.isVirtual,
    expirationDate:cardData.expirationDate,
    cardType: cardData.cardType
   }
  await insert(encryptedCardData)
}


export async function findCard(cardId: number, userId:number){

  const card = await findCardById(cardId)
	if(!card)
  throw {type: 'not_found',
         message: 'a card with the provided id could not be found'}

  const cardOwnerId = card.userId
  if(cardOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the card you are triyng to reach belongs to another user'}

  const decryptedPassword = cryptr.decrypt(card.password)
  const decryptedCvc = cryptr.decrypt(card.cvc)

  const decryptedCard:ICardReturnData =   
  {    
    nameOnCard: card.nameOnCard,
    tag:card.tag,
    cardNumber: card.cardNumber,
    cvc: decryptedCvc,
    password: decryptedPassword,
    isVirtual: card.isVirtual,
    expirationDate:card.expirationDate,
    cardType: card.cardType
  }

  return decryptedCard
  
}

export async function findCards(userId:number){
  const cards = await findAllCards(userId)
  if(cards.length === 0)
  throw {type: 'not_found', message: 'this user has no cards registered'}
	if(!cards)
  throw {type: 'not_found', message: 'the cards information could not be retrievd'}

  const decryptedCards:ICardsReturnData[] = cards.map(card =>
     { 
      const decryptedPassword = cryptr.decrypt(card.password)
      const decryptedCvc = cryptr.decrypt(card.cvc)
      return {
        id: card.id,
        nameOnCard: card.nameOnCard,
        tag:card.tag,
        cardNumber: card.cardNumber,
        cvc: decryptedCvc,
        password: decryptedPassword,
        isVirtual: card.isVirtual,
        expirationDate:card.expirationDate,
        cardType: card.cardType
             }
    })

    return decryptedCards
  
}

export async function deleteCard(cardId: number, userId:number){

  const card = await findCardById(cardId)
	if(!card)
  throw {type: 'not_found',
         message: 'a card with the provided id could not be found'}

  const cardOwnerId = card.userId
  if(cardOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the card you are triyng to delete belongs to another user'}

  await remove(cardId)
}


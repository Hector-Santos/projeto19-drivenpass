import { Request, Response } from 'express';
import { ICardInsertData } from '../types/cardsTypes.js';
import { createCard as createCardService} from '../services/cardsService.js';
import { findCard as findCardService,
         findCards as findCardsService,
         deleteCard as deleteCardService} from '../services/cardsService.js';

export async function createCard(req:Request, res:Response) {
  const card:ICardInsertData = req.body;
  await createCardService(card)      
  res.sendStatus(201);
}

export async function findCard(req:Request, res:Response) {
  const cardId:number = Number(req.params.id);
  const userId:number = res.locals.id
  const card = await findCardService(cardId, userId)      
  res.status(200).send(card);
}

export async function findCards(req:Request, res:Response) {
  const userId:number = res.locals.id
  const cards = await findCardsService(userId)      
  res.status(200).send(cards)
}

export async function deleteCard(req:Request, res:Response) {
  const cardId:number = Number(req.params.id);
  const userId:number = res.locals.id
  await deleteCardService(cardId, userId)      
  res.sendStatus(200);
}
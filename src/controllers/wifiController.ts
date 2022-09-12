import { Request, Response } from 'express';
import { IWiFiInsertData } from '../types/wifiTypes.js';
import { createWiFi as createWiFiService} from '../services/wifiService.js';
import { findWiFi as findWiFiService,
         findWiFis as findWiFisService,
         deleteWiFi as deleteWiFiService} from '../services/wifiService.js';

export async function createWiFi(req:Request, res:Response) {
  const userId:number = res.locals.id
  const wifi:IWiFiInsertData = {userId, ...req.body};
  await createWiFiService(wifi)      
  res.sendStatus(201);
}

export async function findWiFi(req:Request, res:Response) {
  const wifiId:number = Number(req.params.id);
  const userId:number = res.locals.id
  const wifi = await findWiFiService(wifiId, userId)      
  res.status(200).send(wifi);
}

export async function findWiFis(req:Request, res:Response) {
  const userId:number = res.locals.id
  const wifis = await findWiFisService(userId)      
  res.status(200).send(wifis)
}

export async function deleteWiFi(req:Request, res:Response) {
  const wifiId:number = Number(req.params.id);
  const userId:number = res.locals.id
  await deleteWiFiService(wifiId, userId)      
  res.sendStatus(200);
}
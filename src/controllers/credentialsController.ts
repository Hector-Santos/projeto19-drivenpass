import { Request, Response } from 'express';
import { ICredentialInsertData } from '../types/credentialsTypes.js';
import { createCredential as createCredentialService} from '../services/credentialsService.js';
import { findCredential as findCredentialService,
         findCredentials as findCredentialsService,
         deleteCredential as deleteCredentialService} from '../services/credentialsService.js';

export async function createCredential(req:Request, res:Response) {
  const credential:ICredentialInsertData = req.body;
  await createCredentialService(credential)      
  res.sendStatus(201);
}

export async function findCredential(req:Request, res:Response) {
  const credentialId:number = Number(req.params.id);
  const userId:number = res.locals.id
  const credential = await findCredentialService(credentialId, userId)      
  res.status(200).send(credential);
}

export async function findCredentials(req:Request, res:Response) {
  const userId:number = res.locals.id
  const credentials = await findCredentialsService(userId)      
  res.status(200).send(credentials)
}

export async function deleteCredential(req:Request, res:Response) {
  const credentialId:number = Number(req.params.id);
  const userId:number = res.locals.id
  await deleteCredentialService(credentialId, userId)      
  res.sendStatus(200);
}
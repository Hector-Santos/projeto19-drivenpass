import { Request, Response } from 'express';
import { ICredentialData } from '../types/credentialsTypes.js';
import { createCredential as createCredentialService} from '../services/credentialsService.js';



export async function createCredential(req:Request, res:Response) {
  const credential:ICredentialData = req.body;
  await createCredentialService(credential)      
  res.sendStatus(201);
}



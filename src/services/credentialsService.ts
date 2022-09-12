import { insert,
         findByTagAndId,
         findById as findCredentialById,
         findAll as findAllCredentials, 
         remove} from "../repositories/credentialsRepository.js";
import { ICredentialInsertData, ICredentialReturnData, ICredentialsReturnData } from "../types/credentialsTypes.js";
import Cryptr from "cryptr";
import dotenv from 'dotenv'
import { findById as findUserById } from "../repositories/usersRepository.js";
import { credentials } from "@prisma/client";

dotenv.config()

const ENCRYPTION_KEY:string  = process.env.ENCRYPTION_KEY || "key"
const cryptr = new Cryptr(ENCRYPTION_KEY)

export async function createCredential(credentialData: ICredentialInsertData){
  
  const encryptedPassword = cryptr.encrypt(credentialData.password)

  const user = await findUserById(credentialData.userId)
	if(!user) throw {type: 'not_found', message: 'a user with the provided id could not be found'}

  const tagExists = await findByTagAndId(credentialData.tag, credentialData.userId)
	if(tagExists) throw {type: 'conflict', message: 'the provided tag is already in use'}

  const encryptedCredentialData:ICredentialInsertData =
   {
    userId: credentialData.userId,
    url: credentialData.url,
    userName:credentialData.userName,
    password:encryptedPassword,
    tag:credentialData.tag
   }
  await insert(encryptedCredentialData)
}


export async function findCredential(credentialId: number, userId:number){

  const credential = await findCredentialById(credentialId)
	if(!credential)
  throw {type: 'not_found',
         message: 'a credential with the provided id could not be found'}

  const credentialOwnerId = credential.userId
  if(credentialOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the credential you are triyng to reach belongs to another user'}

  const decryptedPassword = cryptr.decrypt(credential.password)

  const decryptedCredential:ICredentialReturnData =   
  {    
    url: credential.url,  
    userName: credential.userName,
    password: decryptedPassword,  
    tag: credential.tag 
  }

  return decryptedCredential
  
}

export async function findCredentials(userId:number){
  const credentials = await findAllCredentials(userId)
  if(credentials.length === 0)
  throw {type: 'not_found', message: 'this user has no credentials registered'}
	if(!credentials)
  throw {type: 'not_found', message: 'the credentials information could not be retrievd'}

  const decryptedCredentials:ICredentialsReturnData[] = credentials.map(credential =>
     { 
      const decryptedPassword = cryptr.decrypt(credential.password)
      return {
      id: credential.id,                
      url: credential.url,  
      userName: credential.userName,
      password: decryptedPassword,  
      tag: credential.tag 
             }
    })

    return decryptedCredentials
  
}

export async function deleteCredential(credentialId: number, userId:number){

  const credential = await findCredentialById(credentialId)
	if(!credential)
  throw {type: 'not_found',
         message: 'a credential with the provided id could not be found'}

  const credentialOwnerId = credential.userId
  if(credentialOwnerId !== userId)
  throw {type: 'unauthorized',
         message: 'the credential you are triyng to delete belongs to another user'}

  await remove(credentialId)
}


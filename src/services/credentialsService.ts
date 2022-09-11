import { insert, findByTagAndId } from "../repositories/credentialsRepository.js";
import { ICredentialData } from "../types/credentialsTypes.js";
import Cryptr from "cryptr";
import dotenv from 'dotenv'
import { findById } from "../repositories/usersRepository.js";

dotenv.config()

const ENCRYPTION_KEY:string  = process.env.ENCRYPTION_KEY || "key"

const cryptr = new Cryptr(ENCRYPTION_KEY)

export async function createCredential(credentialData: ICredentialData){
  
  const encryptedPassword = cryptr.encrypt(credentialData.password)

  const user = await findById(credentialData.userId)
	if(!user) throw {type: 'not_found', message: 'a user with the provided id could not be found'}

  const tagExists = await findByTagAndId(credentialData.tag, credentialData.userId)
	if(tagExists) throw {type: 'conflict', message: 'the provided tag is already in use'}

  const encryptedCredentialData:ICredentialData =
   {
    userId: credentialData.userId,
    url: credentialData.url,
    userName:credentialData.userName,
    password:encryptedPassword,
    tag:credentialData.tag
   }
  await insert(encryptedCredentialData)
}



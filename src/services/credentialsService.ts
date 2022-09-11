import { insert, findByTagAndId } from "../repositories/credentialsRepository.js";
import { ICredentialData } from "../types/credentialsTypes.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
import { findById } from "../repositories/usersRepository.js";

dotenv.config()

export async function createCredential(credentialData: ICredentialData){
  
  const passwordHash = bcrypt.hashSync(credentialData.password, 10);

  const user = await findById(credentialData.userId)
	if(!user) throw {type: 'not_found', message: 'a user with the provided id could not be found'}

  const tagExists = await findByTagAndId(credentialData.tag, credentialData.userId)
	if(tagExists) throw {type: 'conflict', message: 'the provided tag is already in use'}

  const encryptedCredentialData:ICredentialData =
   {
    userId: credentialData.userId,
    url: credentialData.url,
    userName:credentialData.userName,
    password:passwordHash,
    tag:credentialData.tag
   }
  await insert(encryptedCredentialData)
}



import { findByEmail, insert } from "../repositories/usersRepository.js";
import { IUserData } from "../types/usersTypes.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export async function createUser(userData: IUserData){
  
  const passwordHash = bcrypt.hashSync(userData.password, 10);

  const emailExists = await findByEmail(userData.email)
	if(emailExists) throw {type: 'conflict', message: 'the provided email is already in use'}

  const encryptedUserData:IUserData = {email:userData.email, password:passwordHash}
  await insert(encryptedUserData)
}


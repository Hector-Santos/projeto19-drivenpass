import { findByEmail, insert } from "../repositories/usersRepository.js";
import { IUserData } from "../types/usersTypes.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export async function createUser(userData: IUserData){
  
  const passwordHash = bcrypt.hashSync(userData.password, 10);

  const emailExists = await findByEmail(userData.email)
	if(emailExists) throw {type: 'conflict', message: 'the provided email is already in use'}

  const encryptedUserData:IUserData = {email:userData.email, password:passwordHash}
  await insert(encryptedUserData)
}

export async function login(userData: IUserData){

  const user = await findByEmail(userData.email)
	if(!user) throw {type: 'not_found', message: 'a user with the provided email could not be found'}

  const correctPassword = bcrypt.compareSync(userData.password, user.password);
  if(!correctPassword) throw {type: 'unauthorized', message: 'the provided password is incorrect'}

  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = {
  };

  const jwtConfig = {
    expiresIn: EXPIRES_IN
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}

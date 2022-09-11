import { Request, Response } from 'express';
import { IUserData } from '../types/usersTypes.js';
import {login} from '../services/authService.js';
import { createUser } from '../services/usersService.js';



export async function signUp(req:Request, res:Response) {
  const user:IUserData = req.body;
  await createUser(user)      
  res.sendStatus(201);
}

export async function signIn(req:Request, res:Response) {
  const user:IUserData = req.body;
  const token = await login(user)
  res.send(token).status(200);
}



import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export async function verifyToken(req:Request, res:Response, next:NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    
    if (!token) throw {type: 'unauthorized', message: 'no token was provided'}

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

    jwt.verify(token, SECRET, function(err){
        if (err) throw {type: 'unauthorized', message: 'the provided token is not valid'}
      });
    next();
  }


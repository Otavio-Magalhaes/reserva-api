import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { config } from "../../config/env.js"
import { UserPrismaRepository } from "../database/prisma/userPrisma.repository.js"


const UserRepository = new UserPrismaRepository()

export async function authMiddleware(request:Request, response:Response, next:NextFunction){
  const authHeader = request.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if(!token){
    response.status(401).json({error:"Token nao fornecido"})
    return 
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) =>{
    if(err){
      return response.status(403).json({error:"Token invalido ou expirado"})
    }
    console.log(decoded)
    request.user = decoded;
    next()
  })

}
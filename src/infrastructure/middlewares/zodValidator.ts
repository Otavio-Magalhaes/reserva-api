import type {Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";


export const zodValidator = (schema:ZodSchema) =>{
  return(request:Request, response:Response, next: NextFunction)=>{
    const result = schema.safeParse(request.body)

    if(!result.success){
      response.status(400).json({msg: result.error.errors})
      return 
    }
    request.body = result.data
    next();
  }
}            
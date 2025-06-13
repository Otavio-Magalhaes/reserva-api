import type {Request, Response ,NextFunction } from "express";

export async function isAdmin(request: Request, response:Response, next:NextFunction){
  try {
    if(request.user?.role !== 'admin'){
      response.status(401).json({message: "You dont have permission to create a table"})
      return 
      
    }
    next()
  } catch (err) {
    console.log(err)
    response.status(500).json({message:"Internal server error"})
  }
  
}
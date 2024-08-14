import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CustomError } from "../../domain/errors/custom.error";

export class Validators{

    static isMongoID =(req:Request,res:Response,next:NextFunction)=>{

           const {id}= req.params
            
           const isValid=mongoose.isValidObjectId(id) 

           if(!isValid) return res.status(400).json({ok:false, message:'el id del producto es invalido'})
           

            next()
        

    }
}
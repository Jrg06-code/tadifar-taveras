import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { AnyZodObject, ZodError } from "zod";

export class ValidationSchema{
    
   
      static validation=(schema:AnyZodObject)=>
        (req:Request,res:Response,next:NextFunction)=>{

      
       

       try {
        if(req.files){
            const imagen = req.files.img 
            req.body.img = req.files.img
            schema.parse({...req.body,img:imagen})
        }

      
        const hola=schema.parse(req.body)


    
        console.log(hola.available)
      
        
        next()
       } catch (error) {
        
        if(error instanceof ZodError){
            
            return res.status(400).json(error.issues.map(issue=>({ok:false,message:issue.path[0] +' '+issue.message.toLowerCase()})
                
                
               
            ))
        }
        return res.status(400).json({error:'error'})
       }

    }
}
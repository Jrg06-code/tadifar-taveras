import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { JwtAdapter } from "../../config/jwt.adapter";
import { AuthService } from "../services/auth.services";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthController{

    constructor(
        public readonly authService:AuthService,
    ){}


    private handleError = (error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({ok:false,message:error.message})
        }
        console.log(`${error}`)
        return res.status(500).json({error:'Internal server Error'})
    }

    loginUser = (req:Request,res:Response)=>{

       const [error,LoginDto]=LoginUserDto.create(req.body)
       if(error) return res.status(400).json({ok:false, message: error})

       
       this.authService.loginUser(LoginDto!).then((user)=>res.json(user)).catch(error=>this.handleError(error,res))
      
        
    }

    registerUser= (req:Request,res:Response)=>{

        const [error,RegisterDto] = RegisterUserDto.create(req.body)

       

        if(error) return res.status(400).json({ok:false, message: error})

           this.authService.registerUser(RegisterDto!).then((user)=>res.json(user)).catch(error=>this.handleError(error,res))

    }


}
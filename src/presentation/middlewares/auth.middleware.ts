import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserEntity } from "../../domain/entities/user.entities";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthMiddleware{
    static async validateJWT(req:Request,res:Response,next:NextFunction){
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({ok:false,error:'no token provided'})
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({ok:false, message:'Invalid Bearer Token'})

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await JwtAdapter.validateToken<{id:string}>(token)

            if(!payload) return res.status(401).json({ok:false,message:'invalid token'})

                const user = await UserModel.findById(payload.id)
                if(!user) return res.status(401).json('invalid token - user')

                    req.body.user=UserEntity.fromObject(user)

                    next();
        } catch (error) {
            console.log(error);
            CustomError.internalServer('internal server error')
            
        }
    }
}
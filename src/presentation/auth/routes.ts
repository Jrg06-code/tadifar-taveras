import { Router } from "express";
import { AuthController } from "./controller";

import { ValidationSchema } from "../middlewares/validation.middleware";
import { AuthSchema } from "../../config/schemas/userSchema";
import { AuthService } from "../services/auth.services";




export class Authroutes{
    static get routes():Router{
        

       
        const loginValidationMiddleware =  ValidationSchema.validation(AuthSchema.loginSchema)

        const registerValidationMiddleware=
        ValidationSchema.validation(AuthSchema.registerSchema)

        const router = Router();
        const authService = new AuthService()
        const controller = new AuthController(authService)

        router.post('/login',[loginValidationMiddleware], controller.loginUser);

        router.post('/register', [registerValidationMiddleware],controller.registerUser);

        router.get('/revalidate/:token')
       

        return router;
    }
}
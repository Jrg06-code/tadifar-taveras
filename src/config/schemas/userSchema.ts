import {z} from 'zod'

export class AuthSchema{

    static get loginSchema(){
         return z.object({
            email:z.string().email('invalid'),
            password:z.string().min(6)
        })
    }

    static get registerSchema(){
        return z.object({
            name:z.string().min(2),
           email:z.string().email('invalid'),
           password:z.string().min(6)
       })
   }
}
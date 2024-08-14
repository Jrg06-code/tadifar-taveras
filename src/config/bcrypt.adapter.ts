import { compare, compareSync, genSaltSync, hashSync } from 'bcrypt'
import { hash } from 'crypto';

export const bcryptAdapter = {
    hash:(password:string)=>{
        const salt=genSaltSync();
        return hashSync(password,salt)
    },

    compare:(password:string,hashed:string)=>{
        return compareSync(password,hashed)
    }
}



import { boolean } from "zod";
import { CustomError } from "../errors/custom.error";
import { Image } from "../interfaces/imagen.interface";


export class ProductEntity{
    constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly description:string,
        public readonly available:boolean,
        public readonly price: number,
        public readonly img?:Image
    ){}

    static fromObject(object:{[key:string]:any}){
        

        const {id,_id,name,available,price,description,img} = object

        if(!_id && !id){
            throw CustomError.badRequest('Missing id')
        }
        if(!name){
            throw CustomError.badRequest('Missing name')
        }
        if(!description){
            throw CustomError.badRequest('Missing description')
        }
        if(available === undefined){
            throw CustomError.badRequest('Missing available')
        }
        if(!price){
            throw CustomError.badRequest('Missing price')
        }
       
        return new ProductEntity(_id||id,name,description,available,price,img)
    }
}
import { validImgFormat } from "../../../config/valid.img.format";
import { Image } from "../../interfaces/imagen.interface";




export class CreateProductDto{
    constructor(
        public name:string,
        public description:string,
        public available:boolean,
        public price:Number,
        public img?:Image,

    ){}

    static create(object:{[key:string]:any}):[string?,CreateProductDto?]{

        const {name,description,available,img,price}=object;
       

        if(!name) return ['Missing product name']
        if(!description) return ['Missing product description']
        if(!available) return ['Missing product available']
        if(!price) return ['Missing product price']
        
       
        


        return [undefined, new CreateProductDto(name,description,available,price,img)]

    }


}
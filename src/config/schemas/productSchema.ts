import { z } from "zod";
import { validImgFormat } from "../valid.img.format";

export class ProductSchema{

    static get createProduct(){
        return z.object({
            name:z.string().min(2),
            description:z.string().min(10).max(200),
            available:z.preprocess((val) => {
                if (typeof val === 'string') {
                    return val.toLowerCase() === 'true';
                }
                return Boolean(val);
            }, z.boolean()),
            price: z.preprocess((val) => Number(val), z.number()),
            img: z.any().optional().refine((file) => {
                // Asegúrate de que file y file.mimetype existan
                if(!file){
                    return true;
                }
                return  validImgFormat.some(valor => valor === file.mimetype);
            }, {
                message: 'Invalid format of image',
            })



        })
    }
}
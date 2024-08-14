import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { ProductEntity } from "../../domain/entities/product.entity"
import { CreateProductDto } from "../../domain/dtos/products/create-products.dto"
import fileUpload, { UploadedFile } from "express-fileupload"
import { ProductService } from "../services/product.service"


export class Productscontroller{
   

    constructor(
       private readonly ProductService:ProductService
    ){}

    

    private handleError = (error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({ok:false,message:error.message})
        }
        console.log(`${error}`)
        return res.status(500).json({error:'Internal server Error'})
    }


    getProducts = (req:Request,res:Response)=>{
      
        this.ProductService.getAllProduct().then(result=>res.json(result)).catch(error=>this.handleError(error,res))
    }

    getProductById = (req:Request,res:Response)=>{
        const {id}=req.params;

        this.ProductService.getProductById(id).then(result=>res.json(result)).catch(error=>this.handleError(error,res))
    }

    createProducts = (req:Request,res:Response)=>{
        
      
        
    const filePath=req.body.img?.tempFilePath
     
       
        const [error,ProductDto]=CreateProductDto.create({...req.body,filePath})
        if(error) return res.status(400).json(error)

        this.ProductService.createProduct(ProductDto!,filePath).then(response=>res.json(response)).catch(error=>this.handleError(error,res))
    }

    updateProducts=(req:Request,res:Response)=>{

        const {public_id}= req.body
       const {id}=req.params
        const filePath=req.body.img?.tempFilePath


        const  [error,ProductDto]= CreateProductDto.create({...req.body,img:{public_id:public_id}})
        if(error) return res.status(400).json(error);
       
       

        this.ProductService.updateProduct(id,ProductDto!,filePath).then(result=>res.json(result)).catch(error=>this.handleError(error,res))
        

    }

    deleteProducts=(req:Request,res:Response)=>{
        const {id}=req.params;

       this.ProductService.deleteProduct(id).then(result=>res.json(result)).catch(error=>this.handleError(error,res))
    }


}
   



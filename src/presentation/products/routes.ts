import { Router } from "express";
import { Productscontroller } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidationSchema } from "../middlewares/validation.middleware";
import { ProductSchema } from "../../config/schemas/productSchema";
import { CloudinaryUploadService } from "../services/cloudinary.upload.service";
import { envs } from "../../config/envs";
import { ProductService } from "../services/product.service";
import { Validators } from "../middlewares/validators";

export class Productsroutes {
    static get routes(){

        const router = Router()
      
        const productValidationMiddleware=  ValidationSchema.validation(ProductSchema.createProduct)
        const uploadCloudinaryService = new CloudinaryUploadService(envs.CLOUDINARY_CLOUD_NAME,envs.CLOUDINARY_API_KEY,envs.CLOUDINARY_API_SECRET)
        const productService= new ProductService(uploadCloudinaryService)
        const controller = new Productscontroller(productService)

        router.get('/',controller.getProducts)
        router.get('/:id',[Validators.isMongoID],controller.getProductById)
        router.post('/',[AuthMiddleware.validateJWT, productValidationMiddleware],controller.createProducts)
        router.put('/:id',[AuthMiddleware.validateJWT,productValidationMiddleware,Validators.isMongoID],controller.updateProducts)
        router.delete('/:id',[AuthMiddleware.validateJWT,Validators.isMongoID],controller.deleteProducts)

        return router
    }
}
import { ChildProcess } from "child_process";
import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDto } from "../../domain/dtos/products/create-products.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { CloudinaryUploadService } from "./cloudinary.upload.service";


export class ProductService{
    constructor( private readonly CloudinaryUploadService: CloudinaryUploadService){}


    public async getAllProduct(){

       try {
        const [products, total] = await Promise.all([ProductModel.find(),
        ProductModel.countDocuments()])

        console.log(products)

    return {
        total:total,
        products:products
    }
    
} catch (error) {
        console.log(error)
        throw CustomError.internalServer('ha ocurrido un error en el sistema, contacta el administrador')
       }


    }

    public async getProductById(id:string){

        try {
            const product = await ProductModel.findById(id)
            if(!product) throw  CustomError.notfound('ese producto no existe')
            
            return product;
        } catch (error) {

            throw CustomError.internalServer(`${error}`)
            
        }


        

    }

    public async createProduct(dto:CreateProductDto,filePath:any){

        const product=await ProductModel.findOne({name:dto.name})
        if(product) throw CustomError.badRequest('producto ya ha sido creado') 
        
       try {
        if(!filePath) return dto;
    
        const result =await this.CloudinaryUploadService.uploadImage({filePath});
        const public_id=result!.public_id.split('/').at(1)
        dto.img={
            public_id:public_id!,
            secure_url:result.secure_url
        };

        const product = new ProductModel(dto)

        await product.save()


        const {...Producto}=ProductEntity.fromObject(product)
        
            return Producto;

       } catch (error) {
        console.log(error)
        throw CustomError.internalServer('ha ocurrido un error')
       }

    }

    public async updateProduct(id:String,dto:CreateProductDto,filePath:any){


        try{
       const existProduct= await ProductModel.findById(id)
       if(!existProduct) throw new Error('este producto no ha sido encontrado')!

        
          
            if(!dto.img?.public_id || !filePath){
                delete dto.img
                console.log(dto.available)
                const newProduct=await ProductModel.findByIdAndUpdate(id,{
                    ...dto
                },{
                    new: true
                  })
                console.log(newProduct?.available)
                const product=ProductEntity.fromObject(newProduct!)
               
                return product;

            };

        const img = await this.CloudinaryUploadService.updateImage({filePath:filePath,public_id:dto.img?.public_id})
         const public_id=img!.public_id.split('/').at(1);
         
            dto.img ={
                public_id:public_id!,
                secure_url:img!.secure_url
            }

            
            const newProduct=await ProductModel.findByIdAndUpdate(id,{
                ...dto 
            },{
                new: true
              });
            console.log(dto)
            const {...product}=ProductEntity.fromObject(newProduct!)
            return product;
        } catch (error) {
            console.log(error)
            throw CustomError.notfound(`${error}`)
        }
    }

    public async deleteProduct(id:string){

       
        try {
        const product = await ProductModel.findById(id);

        console.log(product)
       
        if(product?.available===false) return
        if(!product) throw CustomError.notfound('el producto a eliminar no ha sido encontrado')
        
        
       const updated=await ProductModel.findByIdAndUpdate(id,{
        available:false
       },{
        new: true
      })

    

     

       return {ok:true, message:'el producto ha sido eliminado correctamente'}
        } catch (error) {
            console.log(error
            )
            throw CustomError.internalServer(`${error}`)
        }
        
    }



}


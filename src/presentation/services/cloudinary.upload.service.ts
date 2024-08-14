 import {v2 as cloudinary} from 'cloudinary';
import { CustomError } from '../../domain/errors/custom.error';
import { rm } from "fs/promises";

interface ImageToCloudinary{
  filePath:string;
 public_id?:string;


}

export class CloudinaryUploadService{
    private cloudinary: typeof cloudinary;
    constructor(
    private readonly cloud_name:string,
    private readonly api_key:string,
    private readonly api_secret:string,
    

    ){ this.cloudinary = cloudinary;
        this.cloudinary.config({
          cloud_name: this.cloud_name,
          api_key: this.api_key,
          api_secret: this.api_secret,
          secure: true,
        });}


        uploadImage =async(image:ImageToCloudinary)=>{
        const {filePath}=image
            try {
                        
            const result= await this.cloudinary.uploader.upload(filePath,{
            folder: 'CMS-Store'})
              console.log(result)
            await rm(filePath)

            return result;
    } catch (error) {
   console.log(error)
   throw CustomError.internalServer('ha ocurrrido un error')
    }  
        }



      updateImage = async(image:ImageToCloudinary)=>{
        const{filePath,public_id}=image;

      
        if (!public_id) return;

        try {
         

         const result= await this.cloudinary.uploader.upload(filePath,{
             folder: 'CMS-Store',
            public_id:public_id,
            overwrite: true
          })
          await rm(filePath);
          return result;
          
        } catch (error) {
          console.log(error);

          throw CustomError.internalServer('ha ocurrido un erorr en el sistema, por favor contactar el adminsitrador')
          
        }
      }





   


}


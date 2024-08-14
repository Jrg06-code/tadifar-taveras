import 'dotenv/config'
import {get} from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    MONGO_URL:get('MONGO_URL').required().asString(),
    MONGO_DB_NAME:get('MONGO_DB_NAME').required().asString(),
    MONGO_USER:get('MONGO_USER').required().asString(),
    MONGO_PASS:get('MONGO_PASS').required().asString(),
    CLOUDINARY_CLOUD_NAME:get('CLOUDINARY_CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY:get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET:get('CLOUDINARY_API_SECRET').required().asString(),
    
}
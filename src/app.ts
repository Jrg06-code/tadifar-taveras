import { envs } from './config/envs';
import { MongoDatabase } from './data/mongo/init';
import { AppRoutes } from './presentation/routes';
import {Server} from './presentation/server';

(async()=>{
    main()
   
})()

export async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    public_path:'./public'

})

server.start()

}
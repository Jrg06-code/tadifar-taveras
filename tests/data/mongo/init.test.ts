import mongoose from "mongoose"
import { envs } from "../../../src/config/envs"
import { MongoDatabase } from "../../../src/data/mongo/init"


describe('init mongo db',()=>{

    afterAll(async ()=>{
        await mongoose.connection.close()
    })

    test('should return conection',async ()=>{
        const connected = await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })

        expect(connected).toBe(true)
    })

    test('should throw an error',async()=>{
        try {
            const connected = await MongoDatabase.connect({
                dbName: envs.MONGO_DB_NAME,
                mongoUrl: 'invalid url'
            })
    
            
        } catch (error) {
            expect(error).toBeDefined()
        }

    })
})
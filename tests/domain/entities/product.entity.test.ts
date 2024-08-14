import {ProductEntity} from '../../../src/domain/entities/product.entity'
import {CustomError} from '../../../src/domain/errors/custom.error'


describe('Testing product entity',()=>{
    test('should return an instance of ProductEntitu',()=>{

        const object = {
            id:'123',
            name:'josue',
            description:'hello world',
            available:true,
            price: 1000,
            img:undefined
        }

        const product=ProductEntity.fromObject(object)

        expect(product).toBeInstanceOf(ProductEntity)
        expect(product.name).toEqual(object.name)
        expect(product.description).toEqual(object.description)
        expect(product.id).toEqual(object.id)
        expect(product.available).toEqual(object.available)
        expect(product.price).toEqual(object.price)
        expect(product.img).toEqual(object.img)

        
    })
    
    test('should return error',()=>{

        
        const object = {
            name:'josue',
            description:'hello world',
            available:true,
            price: 1000,
            img:undefined
        }

        try {
            const product=ProductEntity.fromObject(object)

        } catch (error) {
            expect(error).toBeDefined()
        }
       

       

        
    })
    
})
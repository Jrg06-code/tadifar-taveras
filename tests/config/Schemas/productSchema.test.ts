import {ProductSchema} from '../../../src/config/schemas/productSchema'
describe('Test product Schema',()=>{

    test('should validate a products and booleans',()=>{
        
        const obj={
            name:'Josue',
            description:'Person new',
            available: 'FALSE',
            price: 500,
            img: undefined
        }

        const parsedProduct=ProductSchema.createProduct.parse(obj)

        expect(parsedProduct).toEqual(expect.objectContaining({
            name: expect.any(String),
            description:expect.any(String),
            available: expect.any(Boolean),
            price: expect.any(Number),
            img: undefined
        }))

    

        expect(parsedProduct.available).toEqual(false)
            
        
    })

    test('should return error in mimetype',()=>{
        const obj={
            name:'Josue',
            description:'Person new',
            available: 'true',
            price: 500,
            img: {
                mimetype: 'image/pdf'
            }
        }

       try {
        const parsedProduct=ProductSchema.createProduct.parse(obj)
       
       } catch (error) {
        expect(error).toBeInstanceOf(Error)
       }

    
    })
})
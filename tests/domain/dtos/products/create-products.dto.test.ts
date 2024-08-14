import {CreateProductDto} from '../../../../src/domain/dtos/products/create-products.dto'


describe('Testing CreateProductDto',()=>{
   
    test('should return DTO',()=>{
        const obj={
            name:'josue',
            description:'el nuevo gordo',
            available: true,
            price:500
        }
       

        const [error,productDto]= CreateProductDto.create(obj)

        expect(productDto).toBeInstanceOf(CreateProductDto)

        expect(productDto).toEqual(expect.objectContaining({
            name: expect.any(String),
            description: expect.any(String),
            available: expect.any(Boolean),
            price: expect.any(Number),
            img: undefined
        }))
        expect(error).toBeUndefined()


    })

    test('should return missing name',()=>{
        const obj={
            description:'el nuevo gordo',
            available: true,
            price:500
        }

        const [error,productDto]= CreateProductDto.create(obj)

        expect(error).toBe('Missing product name')
        expect(productDto).toBeUndefined()

    })
    test('should return missing description',()=>{
        const obj={
            name:'el nuevo gordo',
            available: true,
            price:500
        }

        const [error,productDto]= CreateProductDto.create(obj)

        expect(error).toBe('Missing product description')
        expect(productDto).toBeUndefined()

    })
    test('should return missing available',()=>{
        const obj={
            name:'el nuevo gordo',
            description: 'hola mundo',
            price:500
        }

        const [error,productDto]= CreateProductDto.create(obj)

        expect(error).toBe('Missing product available')
        expect(productDto).toBeUndefined()

    })
    test('should return missing price',()=>{
        const obj={
            name:'el nuevo gordo',
            available: true,
            description:'hola mundo'
        }

        const [error,productDto]= CreateProductDto.create(obj)

        expect(error).toBe('Missing product price')
        expect(productDto).toBeUndefined()

    })
    
})
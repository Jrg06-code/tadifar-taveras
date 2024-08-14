import {JwtAdapter} from '../../src/config/jwt.adapter'

describe('testing JwtAdapter',()=>{
    test('should return jwt and then decoded',async ()=>{
        const payload={id:'123'}

        const jwt= await JwtAdapter.generateToken(payload);
        const decodedJwt = await JwtAdapter.validateToken(jwt as string)

        expect(jwt).toBeTruthy()
        expect(decodedJwt).toEqual(expect.objectContaining({
            
            id:"123",
        }))})


    test('should return error in generate token',async()=>{
            const payload='hola';

            try {
                const jwt= await JwtAdapter.generateToken(payload);

                expect(true).toBe(false)
            } catch (error) {
                
                
            }

        })
    test('should return error in validate token',async()=>{
        const payload={id:'123'}

            try {
                

        const jwt= await JwtAdapter.generateToken(payload);
        const decodedJwt = await JwtAdapter.validateToken('hola1234')

        

        expect(true).toBe(false)

            } catch (error) {
                
                
            }

        })
    
    })
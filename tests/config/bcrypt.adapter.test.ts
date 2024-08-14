import {bcryptAdapter} from '../../src/config/bcrypt.adapter'
describe('test bcrypt adapter',()=>{

    test('should return password hashed and then compare', ()=>{
        const password=bcryptAdapter.hash('holamundo')
        const isValidPassword = bcryptAdapter.compare('holamundo',password)
        expect(password).toBeTruthy()
        expect(isValidPassword).toBe(true)

    })

    test('should return that password is not valid',()=>{
        const password=bcryptAdapter.hash('holamundo')
        const isValidPassword = bcryptAdapter.compare('ho',password)
        expect(password).toBeTruthy()
        expect(isValidPassword).toBe(false)
    })
})
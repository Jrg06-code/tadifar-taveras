import {RegisterUserDto} from '../../../../src/domain/dtos/auth/register-user.dto'

describe('testing RegisterUserDto',()=>{
    test('should return DTO',()=>{

        const obj={name:'josue',email:'josueskps3@gmail.com',
        password:'123456'
        }

        const [error,registerDto] = RegisterUserDto.create(obj)

        expect(registerDto).toEqual({email:'josueskps3@gmail.com',
            password:'123456', name:'josue'
            })
        expect(error).toBeUndefined()
    })

    test('should return missing password',()=>{
        const obj={email:'josueskps3@gmail.com',name:'josue'}

        const [error,registerDto] = RegisterUserDto.create(obj)

        expect(error).toEqual('Missing password')
        expect(registerDto).toBeUndefined()
    })

    test('should return missing email',()=>{
        const obj={password:'1234',name:'josue'}

        const [error,registerDto] = RegisterUserDto.create(obj)

        expect(error).toEqual('Missing email')
        expect(registerDto).toBeUndefined()
    })
    test('should return missing name',()=>{
        const obj={password:'1234',email:'josue@gmail.com'}

        const [error,registerDto] = RegisterUserDto.create(obj)

        expect(error).toEqual('Missing name')
        expect(registerDto).toBeUndefined()
    })
    test('should return password to short',()=>{
        const obj={password:'1234',name:'josue',email:'josue@gmail.com'}

        const [error,registerDto] = RegisterUserDto.create(obj)

        expect(error).toEqual('password too short')
        expect(registerDto).toBeUndefined()
    })

})
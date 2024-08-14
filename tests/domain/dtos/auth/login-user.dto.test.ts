import {LoginUserDto} from '../../../../src/domain/dtos/auth/login-user.dto'

describe('testing LoginUserDto',()=>{
    test('should return DTO',()=>{

        const obj={email:'josueskps3@gmail.com',
        password:'123456'
        }

        const [error,loginDto] = LoginUserDto.create(obj)

        expect(loginDto).toEqual({email:'josueskps3@gmail.com',
            password:'123456'
            })
        expect(error).toBeUndefined()
    })

    test('should return missing password',()=>{
        const obj={email:'josueskps3@gmail.com'}

        const [error,loginDto] = LoginUserDto.create(obj)

        expect(error).toEqual('Missing password')
        expect(loginDto).toBeUndefined()
    })

    test('should return missing email',()=>{
        const obj={password:'1234'}

        const [error,loginDto] = LoginUserDto.create(obj)

        expect(error).toEqual('Missing email')
        expect(loginDto).toBeUndefined()
    })

})
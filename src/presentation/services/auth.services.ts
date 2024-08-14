import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entities";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthService{

    constructor(){}

    public async registerUser(registerUserDto:RegisterUserDto){
        const existUser = await UserModel.findOne({email:registerUserDto.email})
        if(existUser) throw CustomError.badRequest('Usuario ya existe');


        try {
            const user= new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(registerUserDto.password)
            await user.save();
            const {password,...userEntity} = UserEntity.fromObject(user)

            return userEntity;

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
    public async loginUser(loginUserDto:LoginUserDto){
        const user = await UserModel.findOne({email: loginUserDto.email})
        if(!user) throw CustomError.badRequest('usuario no existe')
        
        const isMatching = bcryptAdapter.compare(loginUserDto.password,user.password!)

        if(!isMatching) throw CustomError.badRequest('datos incorrectoss')

        

        const {password,...userEntity}=UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({id:user.id, email:user.email});
        if(!token) throw CustomError.internalServer('Error while creating jwt')

        
        return {
            ok:true,
            user:userEntity,
            token:token
        }

    }
}
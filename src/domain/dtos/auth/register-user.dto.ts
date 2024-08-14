


export class RegisterUserDto{
    constructor(
        public name:string,
        public email: string,
        public password: string,
        public role?:string
    ){}

    static create(object: {[key:string]:any}):[string?,RegisterUserDto?]{
        const {name, email, password,role=undefined} = object;

       

        if(!name) return ['Missing name']
        if(!email) return ['Missing email']
        if(!password) return ['Missing password'];
        if(password.length <6) return ['password too short']

        return [undefined, new RegisterUserDto(name,email,password,role)]
        
    }
}
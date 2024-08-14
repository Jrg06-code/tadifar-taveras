import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        Required: [true, 'Name is required']

    },
    email:{
        type:String,
        Required: [true, 'Email is required'],
        unique: true

    },
    password:{
        type:String,
        Required:[true,'Password is required']
    },
    role:{
        type:[String],
        default:['USER_ROLE'],
        enum:['ADMIN_ROLE', 'USER_ROLE']
    }
})

export const UserModel = mongoose.model('User',userSchema)
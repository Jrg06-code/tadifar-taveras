import mongoose  from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        Required: [true, 'Name is required']

    },
    description:{
        type:String,
        Required: [true, 'description is required'],
        

    },
    available:{
        type:Boolean,
        Required:[true,'available is required']
    },
    price:{
        type:Number,
        Required:[true,'price is required']
    },
    img:{
        public_id: {
            type:String,
            unique:true,
        },
        secure_url:{
            type:String,
            unique:true,

        }
    }
})
productSchema.set('toJSON',{
    virtuals: true,
    versionKey:false,
    transform: function(doc, ret, options) {
        delete ret._id
        
    },
})

export const ProductModel = mongoose.model('Product',productSchema)
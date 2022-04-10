const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/expirification',{
    useNewUrlParser:true,
   
})

let schema1= mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

let schema2= mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    purchasedate:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
     quantity:{
         type:Number,
        required:true
    },
    expirydate:{
        type:String,
        required:true
    },
    money:{
        type:Number,
        required:true
    },
    productid:{
        type:String,
        required:true
    },
    expired:{
        type:Boolean,
        required:true
    }
})

let schema3= mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    count:
    {
        type:Number,
        required:true
    },
    notifications:{
        type:Object,
        required:true
    }
})
exports.cs= mongoose.model("credentials",schema1);
exports.up= mongoose.model("userproducts",schema2);
exports.ns= mongoose.model("notifications",schema3);


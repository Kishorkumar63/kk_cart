const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true ,"Please  Enter the Value"],
        trim:true,
        maxLength:[100,"Product Name Cannot Exceed 100 Character"]
    },
    price:{
        type:Number,
        required:true,

        default:0.0


    },
    description:{
        type:String,
        required:[true,"Please Enter Produc Description "]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true ,"Please Enter Produc Category"],
        enum:{
            values:[
                "electronics",
                "Mobile Phones",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "books",
                "Clothes/Shoes",
                "beauty/Health",
                "Sports",
                "outdoor",
                "Home"
            ],
            message:"Pelease Select Correct Category"
        }
    },
    seller:{
        type:String,
        required:[true,"Pealse Enter Product Seller"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[20,"Product Stock Cannot Exceed 20"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:mongoose.Schema.Types.ObjectId,
            name:{
                Type:String,
                // required:true
            },
            rating:{
                type:String,
                required:true
            },
comment:{
    type:String,
    required:true
}
        }
    ],
    user:{
type:mongoose.Schema.Types.ObjectId,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const productschema=mongoose.model("product",productSchema)
module.exports=productschema
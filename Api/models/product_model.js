const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    description:String,
    price:Number,
    imageUrl:String
})

module.exports=mongoose.model("Product",productSchema);
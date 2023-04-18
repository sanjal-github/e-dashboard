const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name:
        {
        type:String,
        },
        price:
        {
        type:Number
        },
        category:
        {
            type:String
        },
        // UserId:
        // {
        //     type:String
        // },
        company:
        {
        type:String
        }

    });

    const prodd = new mongoose.model("product",productSchema);
    
    module.exports = prodd
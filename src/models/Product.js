const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100
        },


        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            maxlength: 1000
        },


        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },


        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock cannot be negative"],
            default: 0
        },


        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },


        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);


module.exports = mongoose.model(
    "Product",
    productSchema
);



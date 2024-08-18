import pkg from 'bcryptjs';
const { compareSync } = pkg;
import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 2,
        maxlength: 64
    },
    price: {
        type: Number,
        required: true, 
        min: 1
    },
    description: {
        type: String,
        required: true, 
        minlength: 5, 
        maxlength: 1000
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Category'
    }, 
    codEligible: {
        type: Boolean, 
        default: true, 
        required: true, 
        validate: {
            validator: function(value){
                return !(this.price >= 25000 && this.codEligible)
            },
            message: function(){
                return 'products are not eligible for cod if the price is greater than or equal to 25000';
            }
        }
    }, 
    stock: {
        type: Number, 
        required: true, 
        min: 0
    },
    maxUnitPurchase: {
        type: Number, 
        required: true, 
        min: 1
    },
    lowStockAlert: {
        type: Number, 
        required: true, 
        min: 0
    }
});

const productModel=mongoose.model('product',productSchema);
export {productModel as product}
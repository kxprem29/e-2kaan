import mongoose from 'mongoose';

const cartItemSchema=new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
        
    }
});

const cartItemModel= mongoose.model('cartItem',cartItemSchema);
export {cartItemModel as cartItem};
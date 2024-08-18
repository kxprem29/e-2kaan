import { MongoGCPError } from 'mongodb';
import mongoose from 'mongoose';
import shorthash from 'shorthash';

import {User} from './user.js';

const orderSchema= new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    total: {
        type: Number,
        default: 0
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
});

orderSchema.pre('validate', function(next) {
    let order = this;
    
    order.orderNumber = `DCT-${shorthash.unique(order.orderDate.toString()+order.user.toString())}`;
    next();
});

orderSchema.pre('save', function(next) {
    let order = this;

    User.findOne({ _id: order.user }).populate('cartItems.product')
    .then((user) => {
        user.cartItems.forEach((inCart) => {
            let item = {
                product: inCart.product._id,
                quantity: inCart.quantity,
                price: inCart.product.price
            }
            order.orderItems.push(item);
            order.total += item.quantity * item.price;
            next();
        });
    })
    .catch((err) => {
        return Promise.reject(err);
    });
});

const orderModel= mongoose.model('order',orderSchema);
export {orderModel as order};
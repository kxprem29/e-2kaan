import express from "express";
import { order } from "../models/order.js";
import { authenticateUser } from "../middlewares/auth.js";
import { validateId } from "../middlewares/util.js";
import { User } from "../models/user.js";
import _ from "lodash";

const router = express.Router();

router.get('/', authenticateUser, (req,res) => {
    let user = req.locals.user;

    Order.find({ user: user._id })
    .then((orders) => {
        res.send(orders);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.post('/', authenticateUser, (req, res) => {
    let user = req.locals.user;
    let order = new Order();

    order.user = user._id;
    order.save()
    .then((order) => {
        res.send({
            order,
            notice: 'successfully created an order'
        });
    }).catch((err) => {
        res.send(err); 
    });
});

export {router as orderRouter};
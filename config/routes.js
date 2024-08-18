import express from "express";

import { categoryRouter } from "../controllers/category_controller.js";
import { cartItemRouter } from "../controllers/cartItem_controller.js";
import { productsRouter } from "../controllers/product_controller.js";
import { orderRouter } from "../controllers/order_controller.js";
import { usersRouter } from "../controllers/user_controller.js";

const router =express.Router()
router.use('/categories', categoryRouter);
router.use('/cart_items', cartItemRouter);
router.use('/products', productsRouter);
router.use('/orders', orderRouter);
router.use('/users', usersRouter);

export {router};
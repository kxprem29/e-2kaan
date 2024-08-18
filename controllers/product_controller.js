import express from "express";
import { product } from "../models/product.js";
import { authenticateUser, authorizeUser } from "../middlewares/auth.js";
import { validateId } from "../middlewares/util.js";
import _ from "lodash";

const router = express.Router();

// localhost:3000/products/
router.get('/', (req, res) => {
    Product.find()
    .then((products) => {
        res.send(products);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Product.find(id)
    .then((product) => {
        res.send(product);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.post('/', authenticateUser, authorizeUser, (req, res) => {
    // strong parameters
    let body = _.pick(req.body, ['name','price', 'description', 'category', 'codEligible', 'stock', 'maxUnitPurchase', 'lowStockAlert']);
    let product = new Product(body);

    product.save()
    .then((product) => {
        res.send({
            product, 
            notice: 'successfully created product'
        });
    })
    .catch((err) => {
        res.send(err);
    });
});

router.put('/:id', validateId, authenticateUser, authorizeUser, (req, res) => {
    let id = req.params.id; 
    let body = _.pick(req.body, ['name', 'price', 'description', 'category', 'codEligible', 'stock', 'maxUnitPurchase', 'lowStockAlert']);

    Product.findById(id)
    .then((product) => {
        Object.assign(product, body); 
        return product.save()
    })
    .then((product) => {
        res.send(product);
    })
    .catch((err) => {
        res.send(err);
    });

});

router.delete('/:id', validateId, authenticateUser, authorizeUser, (req,res) => {
    let id = req.params.id;

    Product.findOneAndRemove(id)
    .then((product) => {
        res.send({
            product,
            notice: 'successfully deleted the product'
        })
    })
    .catch((err) => {
        res.send(err);
    })
});

export {router as productsRouter};
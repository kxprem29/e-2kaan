import express from "express"
import { Category } from "../models/category.js"
import { authenticateUser, authorizeUser } from "../middlewares/auth.js"
import { validateId } from "../middlewares/util.js"
import _ from "lodash"

const router = express.Router();

// localhost:3000/categories
router.get('/',(req,res) => {
    Category.find()
    .then((categories) => {
        res.send(categories);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.get('/:id',(req,res) => {
    let id = req.params.id;

    Category.findById(id)
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.post('/', authenticateUser, authorizeUser, (req,res) => {
    let body = _.pick(req.body, ['name']);
    let category = new Category(body);

    category.save()
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.put('/:id', validateId, authenticateUser, authorizeUser, (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name']);

    Category.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.delete('/:id', validateId, authenticateUser, authorizeUser, (req,res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id)
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.send(err);
    })
});

export {router as categoryRouter};
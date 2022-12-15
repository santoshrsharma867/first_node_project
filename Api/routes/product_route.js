const express = require('express');
const router = express.Router();
const Product = require('../models/product_model')
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dg0z2i7nh',
    api_key: '162913275226997',
    api_secret: 'EmM_4wLiZFA10OEnoeEzgQXn8oU'
});


router.get('/', (req, res, next) => {
    Product.find().then(result => {
        res.status(200).json({
            result: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
});




router.post('/', (req, res, next) => {
    console.log(req.body);

    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result)


        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: result.url,
        })


        product.save().then(result => {
            res.status(200).json({
                data: result
            }).catch(err => {
                res.status(501).json({
                    error: err
                })
            })
        })


    })




})



module.exports = router;
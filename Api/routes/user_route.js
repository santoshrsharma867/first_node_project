const express = require('express');
const router = express.Router();
const User = require('../models/user_model')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



router.get('/', (req, res, next) => {
    User.find().then(result => {
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

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })
            user.save().then(result => {
                res.status(200).json({
                    message: "signup successfully"
                })
            }).catch(err => {
                res.status(500).json({
                    message: err
                })
            })

        }
    });
});

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    User.findById(req.params.id).then(result => {
        res.status(200).json({
            result: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
});


router.delete('/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }).then(result => {
        res.status(200).json({
            result: result
        })
    }).catch(err => {
        res.status(200).json({
            message: err
        })
    })
});


router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    }).then(result => {
        res.status(200).json({
            result: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "something went false"
        })
    })
});







module.exports = router;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Api/routes/user_route');
const productRouter = require('./Api/routes/product_route');
const fileUpload = require('express-fileupload');


// mongoose.connect("mongodb+srv://admin:7777Santosh@cluster0.ofmu89z.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://admin:santosh1234@cluster0.zftexbq.mongodb.net/?retryWrites=true&w=majority");

mongoose.connection.on("error", () => {
    console.log('Connection Failed');
});


mongoose.connection.on('connected', () => {
    console.log('Connected successfully')
})

app.use(fileUpload({
    useTempFiles:true
}))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.use('/user', userRouter);
app.use('/product',productRouter);

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: "app is running"
    })
})
module.exports = app;


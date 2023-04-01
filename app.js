const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/user-routes');

require('dotenv').config()
const app = express();

app.use(express.json());
app.use("/api/user", router);

app.use('/', (req,res,next) => {
    res.send('Hello World!!');
});

mongoose.connect(process.env.MONGODB_SERVER)
.then(() => {
    app.listen(4000);
    console.log('Connected to Database and Listening to LocalHost 4000');
})
.catch((err) => {
    console.log(err);
})


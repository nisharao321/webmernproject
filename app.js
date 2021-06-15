const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const cookieparser = require("cookie-parser");

dotenv.config({ path: './config.env' });

// const User = require('./model/userschema');

require('./db/conn');

// parse application/json

app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(require('./router/auth'));
// linking the router file to make our route easy

//2 heroku
const PORT = process.env.PORT || 5000;


// Middlleware : functions are funtions that have access to the request object (req),the response object (res),
// and the next functions i the applications request-response cycle.
// the next funcion is a function in the Express router in which,when invoked executes the middleware succeeding the 
// current middleware

// if we click on login page it will whether user logged in or not. 

// const middleware = (req,res,next) => {
//     console.log("hello my middlewaare");
//     next();//it displays the next page 
// }

//middleware();

// app.get('/', (req, res) => {
//     res.send('hello from the server');
// })

// app.get('/about', (req, res) => {
//     res.send('hello about from the server');
// })

// app.get('/contact', (req, res) => {
//     //res.cookie("test", "nisha");
//     res.send('hello contact from the server');
// })

app.get('/signin', (req, res) => {
    res.send('hello sign in from the server');
})

app.get('/signup', (req, res) => {
    res.send('hello sign up from the server');
})

//3. heroku

if (process.env.NODE_ENV === 'prduction') {
    app.use(express.static("client/build"));
}


app.listen(PORT, () => {
    console.log("connection is setup at", PORT);
})

// to run app.js
// PS E:\Projectone\mernweb\server> nodemon app.js 
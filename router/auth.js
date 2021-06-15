// const { Router } = require("express");
// const e = require("express");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require('../model/userschema');

// router.get('/', (req, res) => {
//     res.send('hello from the server js');
// });

// router.post('/register', (req, res) => {
//     res.send(req.body);
//     console.log(req.body);
// });
//using promise

// router.post('/register', (req, res) => {

//     const { name, email,phone,work,password,cpassword } = req.body;
//     // console.log(name);//not needed
//     // console.log(email);//not needed
//     //checking that user has filled all required data//not needed
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "fill the fields properly" }); 
//     }

//     User.findOne({ email: email })
//         .then((userexist) => {
//             if (userexist) {
//                 return res.status(422).json({ error: "email already exist" });
//             }
//             //to get the user data in the database//not needed
//             const user = new User({ name, email, phone, work, password, cpassword });
            
//             user.save().then(() => {
//                 res.status(201).json({ message:"user registered successfully" });
//             }).catch((err) => res.status(500).json({ error: "failed to register" }));

//         }).catch((err) => { console.log(err); });
    
//    // res.send(req.body);//not needed
//    // res.send(req.body.email);//not needed
//    // res.json({ message: req.body });//not needed
    
// });

//using asyn await

router.post('/register', async(req, res) => {

    const { name, email,phone,work,password,cpassword } = req.body;
    // console.log(name);
    // console.log(email);
    //checking that user has filled all required data
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "fill the fields properly" }); 
    }
    try {
        const userexist = await User.findOne({ email: email })
          if (userexist) {
                return res.status(422).json({ error: "email already exist" });
          } else if (password != cpassword) {
                return res.status(422).json({ error: "passwords are not matching" });
          } else {
              const user = new User({ name, email, phone, work, password, cpassword });
              //hashing
              await user.save();

              res.status(201).json({ message:"user registered successfully" });
         }
        // if (userRegister) {
        //     res.status(201).json({ message:"user registered successfully" });
        // } else {
        //     res.status(500).json({ error: "failed to register" });
        // }
    } catch (err) {
        console.log(err);
    }
//    // res.send(req.body);
//    // res.send(req.body.email);
//    // res.json({ message: req.body });
});

//login route

router.post('/signin', async(req, res) => {
    // console.log(req.body);
    // same as console
    // res.json({ message: "awesome" });
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).json({error:"please fill the data"})
        }
        //to read the data from database
        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password,userLogin.password);

        if (!isMatch) {
            // about password
            res.status(400).json({ error: "invalid credentials" });
        }
        else {
             // need to generate the token and store cookie after the password match
            token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                secure:false,
                httpOnly:true
            });
            console.log(token);
            console.log(".....");


            res.status(200).json({ message: "user signed in successfully" });
        } 
        } else {
            res.status(400).json({ error: "invalid credentials" });
        }
       
    } catch (err) {
        console.log(err);
    }
});

// const auth = async (req, res, next) => {
//     const token = req.cookies.jwtoken;
//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

// 		const rootUser = await User.findOne({
// 			_id: verifyToken._id,
// 			"tokens.token": token
//         });
    
// 	req.token = token;
// 	req.rootUser = "hello";
//     req.userId = rootUser._id;
    
//     next();
// }
//page of about us

router.get("/about",authenticate ,  async (req, res) => {
   // const token = req.cookies.jwtoken;
   // console.log("token");
    res.send(req.rootUser);
  //  console.log(req.url);
});

//get userdata for contact us and home page
router.get("/getdata", authenticate ,async(req, res) => {
    res.send(req.rootUser);
});

//contact us page
router.post('/contact', authenticate, async(req, res) => {
    //res.cookie("test", "nisha");
    // res.send('hello contact from the server');
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "please fill the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
         //   await userContact.save()
            res.status(201).json({ message: "user contact successfully" });
        }

    } catch (err){
        console.log(err);
    }
    

});

router.get("/logout",  async (req,res) => {
    console.log("hello");
    res.clearCookie("jwtoken",{path:'/'});
    res.status(200).send("user logout");
  //  console.log(req.url);
});

module.exports = router;


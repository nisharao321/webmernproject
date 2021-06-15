//INSTALL npm i cookie-parser
// const express = require("express");

// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');

// dotenv.config();
// const Authenticate = async (req, res, next) => {
//   const token = req.cookies.token || '';
//   try {
//     if (!token) {
//       return res.status(401).json('You need to Login')
//     }
//     const decrypt = await jwt.verify(token, process.env.SECRET_KEY);
//     req.user = {
//       id: decrypt.id,
//       firstname: decrypt.firstname,
// 	  };
// 	  console.log(token)
//     next();
//   } catch (err) {
//     return res.status(500).json(err.toString());
//   }
// };

// module.exports = Authenticate;








const jwt = require("jsonwebtoken");
const User = require("../model/userschema")
// const dotenv = require('dotenv');


// dotenv.config();

const authenticate = async (req, res, next) => {
	try {
			//console.log(req.cookies);
			// console.log("......")
			const token = req.cookies.jwtoken;
			console.log(token)
			if (!token) {
				console.log("token not found", token);
			}
			const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

			const rootUser = await User.findOne({
				_id: verifyToken._id,
				"tokens.token": token
			});
		
			if (!rootUser) {
				throw new Error("user not found");
			}
		
			req.token = token;
			req.rootUser = rootUser;
			req.userId = rootUser._id;

			next();

		
	} catch (err) {
		res.status(401).send("Unauthorized: No token provided");
		console.log(err);
	}
};

module.exports = authenticate;
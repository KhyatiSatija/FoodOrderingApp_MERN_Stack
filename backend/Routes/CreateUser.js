const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");
const jwtSecret = "IWantToDanceEatSleepEnjoy"
//when this endpoint of createUser is hit, the req is sent to the server
router.post('/createuser', [
body('email', 'Invalid Email').isEmail(),
body('name', 'Name Must be more than 3 characters').isLength({ min : 3}),
//password must be atleast 6 characters long
body('password', 'Pwd Must be more than 5 characters').isLength({ min : 5})]
,async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // all bcrypt functions are asynchronous
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try{
        // make it await as its an asynchronous operation
        await User.create({
            name : req.body.name,
            password: secPassword, //we are storing the hash value of the pwd
            email : req.body.email,
            location: req.body.location
        })
    // to confirm that a new user has been created
    // this response is received on the end point

    res.json({success: true});
    }
    catch(error){
        console.log(error)
        res.json({success: false});
    }
})

router.post('/loginuser',[
    body('email', 'Incorrect Email').isEmail(),
    body('password','Pwd Must be more than 5 characters').isLength({ min : 5})]
 ,async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        //the entire data of the user whoose email matches gets returned in userData , else userData is None if email is not matched.
        if (!userData) {
            return res.status(400).json({ errors: "Email Not Found! Try Again..." });
        }
        const pwdCompare = await bcrypt.hash(req.body.password, userData.password)

        if (!(pwdCompare)) {
            return res.status(400).json({ errors: 'Incorrect Password. Please try Again' });
        }

        const data = {
            user:{
                id: userData.id
            }
        } 
        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true, authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})


module.exports = router;
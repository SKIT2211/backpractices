const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/registerschema')


router.post('/login', async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email:email})

        const isMatch = await bcrypt.compare(password, user.password)

        const token = await user.generateAuthToken(); 
        console.log("token", token);

        if(isMatch){
            res.status(201).send(user)
        }else{
            res.status(400).send("Details are not correct.!")
        }
    
    }catch(err){
        res.status(400).send("Details are not correct.!")
    }
})

module.exports = router;
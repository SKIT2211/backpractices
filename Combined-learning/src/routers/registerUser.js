const express = require('express');
const router = new express.Router();


const User = require('../models/registerschema')

router.get('/', (req, res) =>{
    res.send("this is home page")
})

router.post('/register', async (req,res) => {
    try{

    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if(password === cpassword){
    const user = new User(req.body)

    const token = await user.generateAuthToken(); 

    res.cookie("jwt", token, {
        expires:new Date(Date.now() + 30000000),
        httpOnly:true
    });

    console.log(req.cookies);

        const createuser = await user.save();
        res.status(201).send(createuser);

    }else{
        res.status(400).send("password not matching.");
    }

    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get('/register', async (req,res) => {
    try{
        const getUsers = await User.find();
        res.status(200).send(getUsers)
    }catch(err){
        res.status(400).send(err)
    }

})

router.get('/register/:id', async (req,res) => {
    try{
        const _id = req.params.id;

        const getUser = await User.findById({_id : _id});

        if(!getUser){
        res.status(404).send()
        }else{
            res.status(200).send(getUser)
        }
    }catch(err){ 
        res.status(500).send(err)
    }

})

router.delete('/register/:id', async (req, res) =>{
    try{
        const _id = req.params.id;

        const deleteUser = await User.findByIdAndDelete({_id : _id})

        if(!deleteUser){
            res.status(400).send()
        }else{
            res.status(200).send(deleteUser)

        }

    }catch(err){
        res.status(400).send("user not found")
    }
})

module.exports = router;

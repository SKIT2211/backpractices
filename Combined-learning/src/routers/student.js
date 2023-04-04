const express = require('express');
const router = new express.Router();

const Student = require('../models/students')

router.get('/', (req, res) =>{
    res.send("this is home page")
})

// router.post('/students', (req,res) => {

//     const user = new Student(req.body)
//     user.save().then(()=> {
//         res.status(201).send(user);
//     }).catch((err) =>{
//         res.status(400).send(err)
//     });
//     // res.send("hello student page is visible.");
// })

router.post('/students', async (req,res) => {
    try{
    const user = new Student(req.body)

    const createuser = await user.save();
    res.status(201).send(createuser);

    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/students', async (req,res) => {
    try{
        const getUsers = await Student.find();
        res.status(200).send(getUsers)
    }catch(err){
        res.status(400).send(err)
    }

})

router.get('/students/:id', async (req,res) => {
    try{
        const _id = req.params.id;

        const getUser = await Student.findById({_id : _id});

        if(!getUser){
        res.status(404).send()
        }else{
            res.status(200).send(getUser)
        }
    }catch(err){ 
        res.status(500).send(err)
    }

})


router.delete('/students/:id', async (req,res) => {
    try{
        const _id = req.params.id;

        const deleteUser = await Student.findByIdAndDelete({_id : _id});

        if(!deleteUser){
        res.status(400).send()
        }else{
            res.status(200).send(deleteUser)
        }
    }catch(err){ 
        res.status(500).send(err)
    }

})

router.patch('/students/:id', async (req,res) => {
    try{
    const _id = req.params.id;

    const updateUser = await Student.findByIdAndUpdate({_id : _id},req.body,{new:true}  );
    if(!updateUser){
        res.status(400).send()
        }else{
            res.status(201).send(updateUser)
        }
    }catch(err){ 
        res.status(500).send(err)
    }
})


module.exports = router;
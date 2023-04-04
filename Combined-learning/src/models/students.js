const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true, 
        minlength: 3

    },
    email :{
        type: String,
        required: true,
        unique: [true, "Email is alreaddy present..!"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid error..!")
            }
        }
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        required: true,
        unique: true
    },
    address:{
        type:String,
        min:3,
        max:30,
        required:true
    }
})

const Student = new mongoose.model('Student', studentSchema);


module.exports = Student;
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required:true,
        minlength: 3
    },
    lastname : {
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
    age:{
        type:Number,
        required: true,
        unique: false

    },
    password:{
        type: String,
        required: true,
        minlength:3
    },
    cpassword:{
        type: String,
        required: true,
        minlength:3
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

    userSchema.methods.generateAuthToken = async function (){
        try{
            const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET);
            this.tokens = this.tokens.concat({token:token})
            await this.save();
            return token;
        }catch(err){
            console.log("token error",err);
        }
    }

    userSchema.pre("save", async function(next){
        if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
        this.cpassword = await bcrypt.hash(this.password , 10);
    }
    next(); 
    })



const User = new mongoose.model("User", userSchema);

module.exports = User ;
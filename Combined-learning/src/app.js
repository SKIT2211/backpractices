require('dotenv').config()

const express = require('express')
const app = express();
require('./database/conn')

const cookieParser = require("cookie-parser")


// const StudentRouter = require('../src/routers/student')
const RegisterUser = require('../src/routers/registerUser')
const LoginUser = require('../src/routers/loginUser')
const port = process.env.PORT || 8000;

app.use(express.json());
// app.use(StudentRouter);
app.use(RegisterUser);
app.use(LoginUser)
app.use(cookieParser())

app.listen(port, () => {
    console.log("okay port is working now!!");
})

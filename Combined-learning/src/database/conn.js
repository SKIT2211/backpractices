const mongoose = require('mongoose')
const url = process.env.DATABASE;

mongoose.connect(url,{
    // useCreateIndex : true,
    // useFindAndModify: false, 
    // useNewUrlParser : true,
    // useUnifiedTopology : true
}).then(()=>{
    console.log("connectionn done.!!");
}).catch((err)=> {
    console.log("no connection",err);
})

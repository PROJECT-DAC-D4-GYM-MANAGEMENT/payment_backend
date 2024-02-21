const express=require("express");
const app=express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const config=require("config");

const person=require("./Routes/person")
const phonepe=require("./Routes/phonepe/phonepe")

// app.use(cors());
app.use(express.json())
app.use("/cricketer",person)
app.use("/payment",phonepe)
app.listen(config.get("port"),()=>{console.log("server started at 9999 ")})
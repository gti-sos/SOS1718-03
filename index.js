 //index lab04
    var express = require("express");
    var app = express();
    app.use("/",express.static(__dirname+"/public"));
    app.get("/hello",(req,res)=>{
       res.send("hello world!");
    });
    app.listen(process.env.PORT);
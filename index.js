//index of hellojm

var express = require("express");
var app = express();

app.get("/hello",(req,res)=>{
    res.send("hello world!");
});

app.listen(process.env.PORT);

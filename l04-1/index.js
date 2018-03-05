var cool = require ("cool-ascii-faces");
var express= require ("express");

var app = express();

app.get("/hello",(req,res)=>{
    res.send("Hello world!");
    
});

app.listen(process.env.PORT);

console.log(cool());
console.log("Hello world!");

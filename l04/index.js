var express =  require("express");
var app = express();
app.get("/hello",(req,res)=>{
    
    res.send("hello!!");
});

app.listen(process.env.PORT);
console.log("Hello world!");
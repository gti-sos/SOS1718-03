 //index lab04
    // var express = require("express");
    //var app = express();
    //app.get("/hello",(req,res)=>{
    //   res.send("hello world!");
    //});
    //app.listen(process.env.PORT);

//index Lab05 

var express = require("express");
var port = (process.env.PORT || 1607);

var app = express();

app.use("/",express.static("/home/ubuntu/workspace/SOS1718-03/sos1718-03/public"));


app.get("/time",(req,res)=>{
    console.log("new request to /time");
    res.send(new Date());
    
});
   
   
app.listen(port,()=>{
    
    console.log(" Server ready on port "+port+"!");
    
}).on("error", (e)=>{
    console.log("Server NOT READY:"+e);
});

console.log("Server setting up...");

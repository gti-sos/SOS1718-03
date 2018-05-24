var newman = require("newman");
var path = require("path");



describe('API works', function() {
     newman.run({
         collection: require(path.join(process.cwd(),"test","SOS1718-03-PruebasNewManGlobal.postman_collection.json")),
         reporters: "cli"
     },function(err){
         if(err)
            throw new err;
         else
            console.log("Collection run complete!");

     });
});




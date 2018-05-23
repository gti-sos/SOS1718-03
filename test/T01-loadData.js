/*global expect*/
var fs = require("fs");
var path = require("path");
var config = require("./config");


describe('Data is loaded', function() {
     it('should show some solarPlants', function() {
        browser
            .get(config.getAppUrl())
            .then(function() {
                element
                    .all(by.repeater('plant in solarPlants'))
                    .then(function(solarPlants) {
                        browser
                        .takeScreenshot()
                        .then(function (png){
                            
                            var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        
                    });
                    
                    expect(solarPlants.length).toBeGreaterThan(0);
            });
    });
 });
 
});




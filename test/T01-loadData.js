/*global expect*/
var fs = require("fs");
var path = require("path");


describe('Data is loaded', function() {
    it('should show some global warmings', function() {
        expect(1).toEqual(1);

    });
     it('should show some solarPlants', function() {
        browser
            .get('https://sos171803ajpg-sandbox-sos171803ajpg.c9users.io/global/#!/')
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


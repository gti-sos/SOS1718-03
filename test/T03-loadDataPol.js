/*global expect*/
/*global browser*/
/*global by*/
/*global config*/
/*global element*/
var fs = require("fs");
var path = require("path");
var config= require("./config");

describe('Data is loaded', function() {
    
    it('should show some stations', function() {
        browser.get('https://sos1718-03.herokuapp.com/#!/pollution').then(function() {
                element.all(by.repeater('st in stations')).then(function(stations) {
                       browser.takeScreenshot().then(function (png){
                            
                            var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T03.png'));
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                            });
                
                    expect(stations.length).toBeGreaterThan(0);
                });
        });
    });
 
});

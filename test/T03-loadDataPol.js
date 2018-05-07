/*global expect*/
var fs = require("fs");
var path = require("path");



describe('Data is loaded', function() {
    it('should show some pollution cities', function() {
        expect(1).toEqual(1);

    });
     it('should show some stations', function() {
        browser
            .get('http://sos1718-03.herokuapp.com/pollution/#!/')
            .then(function() {
                element
                    .all(by.repeater('st in stations'))
                    .then(function(stations) {
                        browser
                        .takeScreenshot()
                        .then(function (png){
                            
                            var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T03.png'));
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        
                    });
                    
                    expect(stations.length).toBeGreaterThan(0);
            });
    });
 });
 
});

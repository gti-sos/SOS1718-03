/*global expect*/

describe('Add Pollution', function() {
    it('should show a new pollution', function() {
        expect(1).toEqual(1);

    });
     it('should show some stations', function() {
        browser
            .get('http://sos1718-03.herokuapp.com/pollution/#!/')
            .then(function() {
                element
                    .all(by.repeater('st in stations'))
                    .then(function(initialPollutionCities) {
                        browser
                        .driver.sleep(2000);
                        
                        element(by.model('newPollution.station')).sendKeys('Huelva Station');
                        element(by.model('newPollution.city')).sendKeys('Huelva');
                        element(by.model('newPollution.year')).sendKeys(2008);
                        element(by.model('newPollution.car')).sendKeys(22469);
                        element(by.model('newPollution.nitrous')).sendKeys(3.5);
                        
                        element(by.buttonText('Add')).click().then(function(){
                            element.all(by.repeater('st in stations')).then(function(stations){
                            expect(stations.length).toEqual(initialPollutionCities.length);
                            });
                        });
                    });  
            });
    });
 
});
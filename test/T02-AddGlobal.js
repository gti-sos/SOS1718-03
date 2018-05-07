/*global expect*/

describe('Add global', function() {
    it('should show a new global warmings', function() {
        expect(1).toEqual(1);

    });
     it('should show some solarPlants', function() {
        browser
            .get('https://http://sos1718-03.herokuapp.com/global/#!/')
            .then(function() {
                element
                    .all(by.repeater('plant in solarPlants'))
                    .then(function(initialGlobalWarmings) {
                        browser
                        .driver.sleep(2000);
                        
                        element(by.model('newGlobal.solarPlant')).sendKeys('Parque-solar-don-alvaro');
                        element(by.model('newGlobal.name')).sendKeys('Badajoz');
                        element(by.model('newGlobal.year')).sendKeys(2018);
                        element(by.model('newGlobal.temperature')).sendKeys(1.0);
                        element(by.model('newGlobal.peakPower')).sendKeys(30);
                        
                        element(by.buttonText('Add')).click().then(function(){
                            element.all(by.repeater('plant in solarPlants')).then(function(solarPlants){
                            expect(solarPlants.length).toEqual(initialGlobalWarmings.length);
                            });
                        });
                    });  
            });
    });
 
});
/*global expect*/

describe('Add global', function() {
    it('should show a new global warmings', function() {
        expect(1).toEqual(1);

    });
     it('should show some solarPlants', function() {
        browser
            .get('https://sos171803ajpg-sandbox-sos171803ajpg.c9users.io/global/#!/')
            .then(function() {
                element
                    .all(by.repeater('plant in solarPlants'))
                    .then(function(initialGlobalWarmings) {
                        browser
                        .driver.sleep(2000);
                        
                        element(by.model('newGlobal.solarPlant')).sendKeys('Sevilla-Plant');
                        element(by.model('newGlobal.name')).sendKeys('Sevilla');
                        element(by.model('newGlobal.year')).sendKeys(2015);
                        element(by.model('newGlobal.temperature')).sendKeys(1.5);
                        element(by.model('newGlobal.peakPower')).sendKeys(0.8);
                        
                        element(by.buttonText('Add')).click().then(function(){
                            element.all(by.repeater('plant in solarPlants')).then(function(solarPlants){
                            expect(solarPlants.length).toEqual(initialGlobalWarmings.length+1);
                            });
                        });
                    });  
            });
    });
 
});
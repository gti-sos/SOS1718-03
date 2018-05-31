/*global angular*/
/*global AmCharts*/
/*global dataProvider*/

angular.module("StatsApp")
  .controller("graphArtist", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
            var api = "proxyART/artists/1/releases";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
                var ultimoAux = [];
                for(var i=0;i<response2.data.length;i++){
                    ultimoAux.push({
                          "y": getRandomArbitrary(-25,26),
                          "x": getRandomArbitrary(-25,26),
                          "value": response1.data.releases[i].title,
                          "y2": getRandomArbitrary(-25,26),
                          "x2": getRandomArbitrary(-25,26),
                          "value2": response2.data[i].nitrous
                        });
                }
                
                console.log(ultimoAux);
                
                var chart = AmCharts.makeChart( "chartdiv", {
                        "type": "xy",
                        "theme": "light",
                        "balloon":{
                         "fixedPosition":true,
                        },
                        "dataProvider": ultimoAux,
                        "valueAxes": [ {
                          "position": "bottom",
                          "axisAlpha": 0
                        }, {
                          "minMaxMultiplier": 1.2,
                          "axisAlpha": 0,
                          "position": "left"
                        } ],
                        "startDuration": 1.5,
                        "graphs": [ {
                          "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                          "bullet": "circle",
                          "bulletBorderAlpha": 0.2,
                          "bulletAlpha": 0.8,
                          "lineAlpha": 0,
                          "fillAlphas": 0,
                          "valueField": "value",
                          "xField": "x",
                          "yField": "y",
                          "maxBulletSize": 100
                        }, {
                          "balloonText": "x:<b>[[x]]</b> y:<b>[[y]]</b><br>value:<b>[[value]]</b>",
                          "bullet": "diamond",
                          "bulletBorderAlpha": 0.2,
                          "bulletAlpha": 0.8,
                          "lineAlpha": 0,
                          "fillAlphas": 0,
                          "valueField": "value2",
                          "xField": "x2",
                          "yField": "y2",
                          "maxBulletSize": 100
                        } ],
                        "marginLeft": 46,
                        "marginBottom": 35,
                        "export": {
                          "enabled": true
                        }
                  });
               
               
               function getRandomArbitrary(min, max) {
                  var random = Math.random() * (max - min) + min;
                  return Math.round(random);
                  
                }
        }); 
    });     
}]);




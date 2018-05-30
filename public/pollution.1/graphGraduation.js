/*global angular*/
/*global AmCharts*/


angular.module("StatsApp")
  .controller("graphGraduation", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
            var api = "proxyMAR/api/v1/medical-attention-rates/";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
                var ultimoAux = [];
                for(var i=0;i<response2.data.length;i++){
                    var tdDetail = {country: response2.data[i].city,visits: response2.data[i].nitrous,color: "#FF0F00"};
                    ultimoAux.push(tdDetail);
                    //ultimoAux.push("country:"+ '" '+response2.data[i].city+'"',"visits:"+ '" '+response2.data[i].nitrous+'"',"color: #FF0F00");
                } 
                for(i=0;i<response1.data.length;i++){
                    tdDetail = {country: response1.data[i].province,visits: response1.data[i].nursing,color: "#04D215"};
                    ultimoAux.push(tdDetail);                }
                console.log(ultimoAux);
               
                var chart = AmCharts.makeChart("chartdiv", {
                    "theme": "light",
                    "type": "serial",
                    "startDuration": 2,
                    "dataProvider": ultimoAux,
                    "valueAxes": [{
                        "position": "left",
                        "axisAlpha":0,
                        "gridAlpha":0
                    }],
                    "graphs": [{
                        "balloonText": "[[category]]: <b>[[value]]</b>",
                        "colorField": "color",
                        "fillAlphas": 0.85,
                        "lineAlpha": 0.1,
                        "type": "bar",
                        "topRadius":1,
                        "valueField": "visits"
                    }],
                    "depth3D": 40,
                	"angle": 30,
                    "chartCursor": {
                        "categoryBalloonEnabled": false,
                        "cursorAlpha": 0,
                        "zoomable": false
                    },
                    "categoryField": "country",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "axisAlpha":0,
                        "gridAlpha":0
                
                    },
                    "export": {
                    	"enabled": true
                     }
                
                }, 0);
            
            });
        }); 
}]);




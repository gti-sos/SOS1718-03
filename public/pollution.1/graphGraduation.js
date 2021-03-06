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
                for (var i = 0; i < response2.data.length; i++) {
                    var tdDetail = { country: response2.data[i].city, visits: response2.data[i].nitrous, color: "#FF0F00" };
                    ultimoAux.push(tdDetail);
                    //ultimoAux.push("country:"+ '" '+response2.data[i].city+'"',"visits:"+ '" '+response2.data[i].nitrous+'"',"color: #FF0F00");
                }
                for (i = 0; i < response1.data.length; i++) {
                    tdDetail = { country: response1.data[i].province, visits: response1.data[i].nursing, color: "#04D215" };
                    ultimoAux.push(tdDetail);
                }
                console.log(ultimoAux);
               
                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "pie",
                    "theme": "light",
                    "innerRadius": "40%",
                    "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
                    "dataProvider": ultimoAux,
                    "balloonText": "[[value]]",
                    "valueField": "visits",
                    "titleField": "country",
                    "balloon": {
                        "drop": true,
                        "adjustBorderColor": false,
                        "color": "#FFFFFF",
                        "fontSize": 16
                    },
                    "export": {
                        "enabled": true
                    }
                });
            });
        }); 
}]);




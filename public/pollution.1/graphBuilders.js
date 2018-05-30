/*global angular*/
/*global AmCharts*/


angular.module("StatsApp")
  .controller("graphBuilders", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
            var api = "proxyBUI/api/v1/builders?apikey=davvicfra/";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
                /*var ultimoAux = [];
                for(var i=0;i<response2.data.length;i++){
                    var tdDetail = {country: response2.data[i].city,visits: response2.data[i].nitrous,color: "#FF0F00"};
                    ultimoAux.push(tdDetail);
                    //ultimoAux.push("country:"+ '" '+response2.data[i].city+'"',"visits:"+ '" '+response2.data[i].nitrous+'"',"color: #FF0F00");
                } 
                for(i=0;i<response1.data.length;i++){
                    tdDetail = {country: response1.data[i].province,visits: response1.data[i].nursing,color: "#04D215"};
                    ultimoAux.push(tdDetail);                }
                console.log(ultimoAux);*/
                console.log(response1.data);
               
                 var trace1 = {
                  x: response2.data.map(function(d){return parseInt(d.year)}),
                  y: response2.data.map(function(d){return parseInt(d.nitrous)}),
                  mode: 'markers',
                  type: 'scatter',
                  name: 'Nitrous',
                  marker: { size: 12 }
                };
                
                var trace2 = {
                  x: response1.data.map(function(d){return parseInt(d.year)}),
                  y: response1.data.map(function(d){return parseInt(d.pole)}),
                  mode: 'markers',
                  type: 'scatter',
                  name: 'Pole',
                  marker: { size: 12 }
                };
                
                var data = [ trace1, trace2 ];
                
                var layout = { 
                  xaxis: {
                    range: [ 1990, 2025 ] 
                  },
                  yaxis: {
                    range: [0, 70]
                  },
                  title:'Datas of Poles and Nitrous by year'
                };
                
                Plotly.newPlot('myDiv', data, layout);
            });
        }); 
}]);




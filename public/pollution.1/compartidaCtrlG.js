/*global angular*/
/*global Highcharts*/
/*global google*/
"use strict"
angular.module("StatsApp")
  .controller("compartidaCtrlG", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
           // var api2 = "proxyADAN/api/v2/pollution-cities";
            var api = "https://sos171803ajpg-sandbox-sos171803ajpg.c9users.io/api/v1/global-warmings";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
     
     Highcharts.chart('GraficoNormal', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'GraficoNormal'
    },
    xAxis: {
        categories: response2.data.map(function(d){return (parseInt(d.year))}),
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Stats'
        },
        labels: {
            formatter: function () {
                return this.value / 1000;
            }
        }
    },
    tooltip: {
        split: true,
        valueSuffix: 'und'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
                        name: 'nitrous',
                        data: response2.data.map(function(d){return parseInt(d.nitrous)})
                        },{
                        name: 'peakPower',
                        data: response1.data.map(function(d){return parseInt(d.peakPower)})
            }]
});   
});
});      
}]);
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
            var api = "https://sos171803ajpg-sandbox-sos171803ajpg.c9users.io/api/v2/global-warmings";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
                Highcharts.chart('GraficoNormal', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: ' GraficoNormal '
                    },
                    
                    xAxis: {
                        categories: response2.data.map(function(d){return (parseInt(d.year))})
                    },
                    yAxis: {
                        title: {
                            text: 'Stats1'
                        },
                        labels: {
                            formatter: function () {
                                return this.value ;
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: 
                    [{
                        name: 'nitrous',
                        data: response2.data.map(function(d){return parseInt(d.nitrous)})
                        },{
                        name: 'temperature',
                        data: response1.data.map(function(d){return parseInt(d.temperature)})
                    }]
});
});
});
        
       
}]);
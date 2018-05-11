/*global angular*/
/*global Highcharts*/
/*global google*/
"use strict"
angular.module("StatsApp")
  .controller("compartidaCtrl", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/global-warmings";
            var api2 = "proxyADAN/api/v2/pollution-cities";
            var api = "https://sos171803amfm-sandbox-sos171803amfm.c9users.io/api/v2/pollution-cities";
            
            
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
                        name: 'peakPower',
                        data: response2.data.map(function(d){return parseInt(d.peakPower)})
                        },{
                        name: 'temperature',
                        data: response2.data.map(function(d){return parseInt(d.temperature)})
                        },{
                        name: 'Car',
                        data: response1.data.map(function(d){return parseInt(d.car)})
                    }]
});
});
        });
        
       
        
         $http.get(api2).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('GraficoProxy', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'GraficoProxy'
    },
    
    xAxis: {
        categories: response1.data.map(function(d){return (parseInt(d.year))}),
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
           
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series:   [{
                        name: 'peakPower',
                        data: response2.data.map(function(d){return parseInt(d.peakPower)})
                        },{
                        name: 'temperature',
                        data: response2.data.map(function(d){return parseInt(d.temperature)})
                        },{
                        name: 'Car',
                        data: response1.data.map(function(d){return parseInt(d.car)})
                    }]
});
        });
        });
           
}]);
/*global angular*/
/*global Highcharts*/
/*global google*/
"use strict"
angular.module("StatsApp")
  .controller("compartidaCtrlG", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/pollution-cities";
            var api2 = "proxyDAP/api/v1/divorces-an";
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






                                        $http.get(api2).then(function(response1) {
                                            $http.get(apiPropia).then(function(response2) {
                                                Highcharts.chart('GraficoProxy', {
                                                    chart: {
                                                        type: 'bar'
                                                    },
                                                    title: {
                                                        text: 'GraficoProxy'
                                                    },

                                                    xAxis: {
                                                        categories: response2.data.map(function(d) { return (parseInt(d.year)) }),
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
                                                    series: [{
                                                        name: 'car',
                                                        data: response2.data.map(function(d) { return parseInt(d.car) })
                                                    }, {
                                                        name: 'break',
                                                        data: response1.data.map(function(d) { return parseInt(d.break) })
                                                    }]
                                                });
                                            });
                                        });
});
});      
}]);
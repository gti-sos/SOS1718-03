/*global angular*/
/*global Highcharts*/

angular.module("StatsApp")
    .controller("compartidaCtrl1", ["$scope", "$http",
        function($scope, $http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/global-warmings";
            var api2 = "proxySUS/api/v2/span-univ-stats/";
            
            $http.get(api2).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {
                    
                     var ultimo = [];
    
                     for (var i = 0; i < response1.data.length; i++) {
                         if (i < response2.data.length)
                             ultimo.push((response2.data[i].year + " " + response1.data[i].year));
                         else
                             ultimo.push(("0 " + response1.data[i].year));
                     }
                    
                    
                    Highcharts.chart('Graph2', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'span-univ-stats & global-warmings'
                        },
    
                        xAxis: {
                            categories: ultimo,
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
                            
                            name: 'temperature',
                            data: response2.data.map(function(d) { return parseInt(d.temperature) })
                        },{
                            name: 'peakPower',
                            data:response2.data.map(function(d) { return parseInt(d.peakPower) })
                        },
                        {
                            name: 'Master',
                            data: response1.data.map(function(d) { return parseInt(d.master) })
                        }]
                    });
                });
            });
        }]);  
                            
                           
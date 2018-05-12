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
            var api = "https://sos1718-03.herokuapp.com/api/v1/global-warmings";
            
            
        $http.get(api).then(function(response1){
            $http.get(apiPropia).then(function(response2){
                
                 var ultimo = [];
                                 
                for(var i=0;i<response1.data.length;i++){
                    if(i<response2.data.length)
                        ultimo.push((response2.data[i].year+" "+response1.data[i].year));
                    else
                        ultimo.push(("0 "+response1.data[i].year));
                }
     
     
                     Highcharts.chart('GraficoNormal', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'GraficoNormal'
                    },
                    xAxis: {
                        categories: ultimo,
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of units'
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
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
//-------------------------------------------------------------------------------------------------



        $http.get(api2).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                
                
                var ultimo = [];
                                 
                for(var i=0;i<response1.data.length;i++){
                    if(i<response2.data.length)
                        ultimo.push((response2.data[i].year+" "+response1.data[i].year));
                    else
                        ultimo.push(("0 "+response1.data[i].year));
                } 
                
                
                Highcharts.chart('GraficoProxy', {
                    title: {
                        text: 'Break and Nitrous'
                    },
                    xAxis: {
                        categories: ultimo,
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of units'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            }
                        }
                    },
                
                    series: [{
                            name: 'nitrous',
                            data: response2.data.map(function(d){return parseInt(d.nitrous)})
                            },{
                            name: 'break',
                            data: response1.data.map(function(d){return parseInt(d.break)})
                            }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                });
            });
        });
}]);
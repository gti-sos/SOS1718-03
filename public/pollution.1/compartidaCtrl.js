/*global angular*/
/*global Highcharts*/

angular.module("StatsApp")
    .controller("compartidaCtrl", ["$scope", "$http",
            function($scope, $http) {
                console.log("List Ctrl initialized!");
                var apiPropia = "/api/v2/global-warmings";
                var api2 = "proxySUS/api/v2/span-univ-stats/";
                var api = "https://sos1718-04.herokuapp.com/api/v1/unemployment-rates/";


                $http.get(api).then(function(response1) {
                            $http.get(apiPropia).then(function(response2) {
                                                Highcharts.chart('Graph1', {
        
                                                chart: {
                                                    type: 'column'
                                                },
                                            
                                                title: {
                                                    text: 'unemployment-rates & global-warmings'
                                                },
                                                
                                                xAxis: {
                                                        categories: response2.data.map(function(d) { return (parseInt(d.year)
                                                        +","+ response1.data.map(function(d) { return (parseInt(d.year))}))}),
                                                        title: {
                                                            text: null
                                                        }
                                                    },
                                            
                                                yAxis: [{
                                                    className: 'highcharts-color-0',
                                                    title: {
                                                        text: 'Primary axis'
                                                    }
                                                }, {
                                                    className: 'highcharts-color-1',
                                                    opposite: true,
                                                    title: {
                                                        text: 'Secondary axis'
                                                    }
                                                }],
                                            
                                                plotOptions: {
                                                    column: {
                                                        borderRadius: 5
                                                    }
                                                },
                                            
                                                series: [{
                                                   
                                                        name: 'temperature',
                                                        data: response2.data.map(function(d) { return parseInt(d.temperature) })
                                                    },{
                                                        name: 'peakPower',
                                                        data:response2.data.map(function(d) { return parseInt(d.peakPower) })
                                                    
                                                    },{
                                                         name: 'Illiterate',
                                                        data:response1.data.map(function(d) { return parseInt(d.illiterate) }) 
                                                    }
                                                    ]
                                            });
                                    });
                           }); 
  

                                        $http.get(api2).then(function(response1) {
                                            $http.get(apiPropia).then(function(response2) {
                                                Highcharts.chart('Graph2', {
                                                    chart: {
                                                        type: 'bar'
                                                    },
                                                    title: {
                                                        text: 'span-univ-stats & global-warmings'
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
                            
                           
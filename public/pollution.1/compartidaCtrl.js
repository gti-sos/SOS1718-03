/*global angular*/
/*global Highcharts*/

angular.module("StatsApp")
    .controller("compartidaCtrl", ["$scope", "$http",
            function($scope, $http) {
                console.log("List Ctrl initialized!");
                var apiPropia = "/api/v2/global-warmings";
                var api2 = "proxyUPM/api/v1/unemployment-rates/";
                var api = "https://sos1718-04.herokuapp.com/api/v1/unemployment-rates/";


                $http.get(api).then(function(response1) {
                            $http.get(apiPropia).then(function(response2) {
                                        Highcharts.chart('Graph1', {
                                            chart: {
                                                type: 'area'
                                            },
                                            title: {
                                                text: 'span-univ-stats & global-warmings'
                                            },
                                           
                                            xAxis: {
                                                        categories: response1.data.map(function(d) { return (parseInt(d.year)) }),
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
                                            tooltip:{
                                                        pointFormat: '{}'
                                                    },
                                            tooltip: {
                                                pointFormat: null
                                                     },
                                            plotOptions: {
                                                area: {
                                                    pointStart: 1940,
                                                    marker: {
                                                        enabled: false,
                                                        symbol: 'circle',
                                                        radius: 2,
                                                        states: {
                                                            hover: {
                                                                enabled: true
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            series: [{
                                                name: 'peakPower',
                                                data: response2.data.map(function(d) { return parseInt(d.peakPower) })
                                            }, {
                                                name: 'temperature',
                                                data: response2.data.map(function(d) { return parseInt(d.temperature) })
                                            }, {
                                                name: 'Illiterate',
                                                data: response1.data.map(function(d) { return parseInt(d.illiterate) })
                                            }]
                                        });







                                        $http.get(api2).then(function(response1) {
                                            $http.get(apiPropia).then(function(response2) {
                                                Highcharts.chart('Graph2', {
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
                                                        name: 'peakPower',
                                                        data: response2.data.map(function(d) { return parseInt(d.peakPower) })
                                                    }, {
                                                        name: 'temperature',
                                                        data: response2.data.map(function(d) { return parseInt(d.temperature) })
                                                    }, {
                                                        name: 'Car',
                                                        data: response1.data.map(function(d) { return parseInt(d.car) })
                                                    }]
                                                });
                                            });
                                        });
                                });  
                            }); 
                        }]);    
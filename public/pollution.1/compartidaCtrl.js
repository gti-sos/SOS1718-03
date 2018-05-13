/*global angular*/
/*global Highcharts*/

angular.module("StatsApp")
    .controller("compartidaCtrl", ["$scope", "$http",
            function($scope, $http) {
                console.log("List Ctrl initialized!");
                var apiPropia = "/api/v2/global-warmings";
                var api = "https://sos1718-04.herokuapp.com/api/v1/unemployment-rates/";


                $http.get(api).then(function(response1) {
                            $http.get(apiPropia).then(function(response2) {
                                
                                
                                var ultimo = [];

                                for (var i = 0; i < response2.data.length; i++) {
                                    if (i < response1.data.length)
                                        ultimo.push((response1.data[i].year + " " + response2.data[i].year));
                                    else
                                        ultimo.push(("0 " + response2.data[i].year));
                                }
                                                Highcharts.chart('Graph1', {
        
                                                chart: {
                                                    type: 'column'
                                                },
                                            
                                                title: {
                                                    text: 'unemployment-rates & global-warmings'
                                                },
                                                
                                                xAxis: {
                                                        categories: ultimo,
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
                                                         name: 'Illiterate',
                                                        data:response1.data.map(function(d) { return parseInt(d.illiterate) }) 
                                                    },
                                                    {
                                                   
                                                        name: 'temperature',
                                                        data: response2.data.map(function(d) { return parseInt(d.temperature) })
                                                    },{
                                                        name: 'peakPower',
                                                        data:response2.data.map(function(d) { return parseInt(d.peakPower) })
                                                    
                                                    }
                                                    ]
                                            });
                                    });
                           }); 
  

                                        
     }]);  
                            
                           
 /* global Highcharts */
 /* global angular*/
 
angular.module("StatsApp").controller("citybik",["$scope", "$http", function($scope, $http) {
    
    console.log("List Ctrl initialized!");
       var apiPropia = "/api/v2/global-warmings";
        var api2 = "proxyCIT/v2/networks";
            
     
       $http.get(api2).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {
                    
                    var ultimo = [];
                   
                     for (var i = 0; i < 5; i++) {
                            
                         ultimo.push([-50,100,response1.data.networks[i].location.latitude,100,200]);
        
                     }
                      for (var i = 0; i < 5; i++) {
                            
                         ultimo.push([-50,100,response2.data[i].peakPower,100,200]);
        
                     }
                     
                    
    
    
    
Highcharts.chart('container', {

    chart: {
        type: 'boxplot'
    },

    title: {
        text: 'Highcharts box plot styling'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        categories: ['1', '2', '3'],
        title: {
            text: 'Experiment No.'
        }
    },

    yAxis: {
        title: {
            text: 'Observations'
        }
    },

    plotOptions: {
        boxplot: {
            fillColor: '#F0F0E0',
            lineWidth: 2,
            medianColor: '#0C5DA5',
            medianWidth: 3,
            stemColor: '#A63400',
            stemDashStyle: 'dot',
            stemWidth: 1,
            whiskerColor: '#3D9200',
            whiskerLength: '20%',
            whiskerWidth: 3
        }
    },

    series: [{
        name: 'Observations',
        data: 
           ultimo
        
    }]
});
});
});
}]);
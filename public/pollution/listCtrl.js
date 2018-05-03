 /* global angular */
 angular.module("pollutionApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  
  console.log("List Ctrl initialited");
  var api = "/api/v2/pollution-cities";
  var search = "?";
  var offset = -10;
  var limit = 10;
  var n_elem;
    
  getPollutionCitiesCount();

   function getPollutionCities(){
      $http.get(api + search).then(function(response) {
       $scope.stations = response.data;
      });
      search = "?";
   }
  
  getPollutionCities();

  $scope.addPollution = function() {
   $http.post(api, $scope.newPollution).then(function successCallback(response) {
    $scope.status = "Status ( Pollution added correctly)";
    window.alert("El recurso se ha creado con exito!");
    getPollutionCities();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "Status : ( FAIL: Pollution does not have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "Status : ( FAIL: Pollution already exists!!!)";
    }
   });
   getPollutionCities();

  };
 
   $scope.getPollution = function() {
   if ($scope.newPollution.from) {
    search += ("&from=" + $scope.newPollution.from);
   }
   if ($scope.newPollution.to) {
    search += ("&to=" + $scope.newPollution.to);
   }
   getPollutionCities();

  };
  
  $scope.getPollutionNext = function() {
  
   
   if (offset<n_elem-limit) {
   offset += limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }else{
        window.alert("No hay pagina siguiente");
        offset = -limit;
   }
   
   getPollutionCities();
  };
  
  
  $scope.getPollutionPrev = function() {
   if (offset>0) {
    offset -= limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }else{
        window.alert("No hay pagina anterior");
   }
   getPollutionCities();
  };


  $scope.deletePollution = function(station) {
   $http.delete(api + "/" + station).then(function(response) {
    $scope.status = "Status : ( Pollution deleted correctly)";
    window.alert("El dato se ha borrado con exito");
    getPollutionCities();
   });
  };

  $scope.deleteAllPollution = function() {
   $http.delete(api).then(function(response) {
    $scope.status = "Status : (All pollutions deleted correctly)";
    window.alert("Los datos se han borrado con exito");
    getPollutionCities();
   });
  };



 
$scope.loadInitialData = function() {
   $http.get(api + "/loadInitialData").then(function(response) {
    window.alert("Los datos se han cargado con exito");
    getPollutionCities();
    });
  };

  
function getPollutionCitiesCount(){
      $http.get(api + search).then(function(response) {
       $scope.stations = response.data;
       n_elem = response.data.length;
      });
      search = "?";
   }
   
  $http
   .get("/api/v2/global-warmings")
   .then(function(response){
    console.log(response.data);
    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Cities with more nitrous'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'nitrous (microgramos/m^3)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'nitrous in 2014: <b>{point.y:.1f} microgramos/m^3</b>'
    },
    series: [{
        name: 'Nitrous',
        data: [
            ['fernandez ladreda oporto', 53],
            ['l eixample', 52],
            ['gracia sant gervasi', 52],
            ['escuelas aguirre', 53],
            ['pista de silla', 46],
            ['Huelva Station', 35]
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
  });
 });
 
 
 
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
          ['Station', 'Car','Nitrous','City','Year'],
          ['fernandez ladreda oporto', 3256265,60,'madrid',2014],
          ['l eixample', 2347766 ,52,'barcelona',2014],
          ['gracia sant gervasi',2347766,58,'barcelona',2014],
          ['escuelas aguirre', 3256265,53, 'madrid', 2014],
          ['pista de silla', 170977,46, 'valencia', 2014],
          ['huelva station',22469,35, 'huelva', 2008]
      ]);

      var options = {
        title: 'Correlation between nitrous, car ' +
               'and stations of some Spanish countries (2008-2014)',
        hAxis: {title: 'car'},
        vAxis: {title: 'nitrous'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
    
    
    new Chartist.Line('.ct-chart', {
  labels: ['2008', '2014',],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
}, {
  fullWidth: false,
  fullHeigth: false,
  chartPadding: {
    right: 40
  }
});


}]);

 
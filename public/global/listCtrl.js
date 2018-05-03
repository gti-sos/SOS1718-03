 /* global angular */
 /* global Highcharts */
  /* global google */
  /* global c3 */
 angular.module("globalApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  
  

  
  console.log(2);
  var api = "/api/v2/global-warmings";
  var search = "?";
  var offset = -10;
  var limit = 10;
  var n_elem;
  
  getGlobalWarmingsCount();
  
  console.log(n_elem + " fueraa");
  
   function getGlobalWarmings(){
      $http.get(api + search).then(function(response) {
       $scope.solarPlants = response.data;
      });
      search = "?";
   }
  
  getGlobalWarmings();

  $scope.addGlobal = function() {
   $http.post(api, $scope.newGlobal).then(function successCallback(response) {
    $scope.status = "Status :  (New solar plant has been added )";
    window.alert("El recurso se ha creado con exito!");
    getGlobalWarmings();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "Status :  ( FAIL: solar plant does not have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "Status :  ( FAIL: solar plant already exists!!!)";
    }
   });
   getGlobalWarmings();

  };
  
   $scope.getGlobal = function() {
   if ($scope.newGlobal.from) {
    search += ("&from=" + $scope.newGlobal.from);
   }
   if ($scope.newGlobal.to) {
    search += ("&to=" + $scope.newGlobal.to);
   }
   getGlobalWarmings();

  };
  
  $scope.getGlobalNext = function() {
  
   
   if (offset<n_elem-10) {
   offset += limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }else{
        window.alert("No hay pagina siguiente");
        offset = -10;
   }
   
   getGlobalWarmings();
  };
  
  
  $scope.getGlobalPrev = function() {
   if (offset>0) {
    offset -= limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }else{
        window.alert("No hay pagina anterior");
   }
   getGlobalWarmings();
  };

  $scope.deleteGlobal = function(solarPlant) {
   $http.delete(api + "/" + solarPlant).then(function(response) {
   window.alert("El dato se ha borrado con exito");
    getGlobalWarmings();
   });
  };

  $scope.deleteAllGlobal = function() {
   $http.delete(api).then(function(response) {
    window.alert("Los datos se han borrado con exito");
    getGlobalWarmings();

   });
  };



 $scope.loadInitialData = function() {
   $http.get(api + "/loadInitialData").then(function(response) {
    window.alert("Los datos se han cargado con exito");
    getGlobalWarmings();
    });
  };

  
function getGlobalWarmingsCount(){
      $http.get(api + search).then(function(response) {
       $scope.solarPlants = response.data;
       n_elem = response.data.length;
      });
      search = "?";
   }


  $http
   .get("/api/v2/global-warmings")
   .then(function(response){
    console.log(response.data);
     Highcharts.chart('container', {

    title: {
        text: 'SOLAR PLANT DATA'
        
    },

    subtitle: {
        text: 'Datas'
    },

     xAxis: {
     
     categories : response.data.map(function(d) {
         return d.year;
     })
     
    },
    
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: true
            },
        }
    },

    series: [{
        name: 'peakPower',
        
        data: response.data.map(function(d) {return parseInt(d.peakPower)})
    },{
        name: 'Temperature',
        data: response.data.map(function(d) {return parseInt(d.temperature)})
    }
    
    ]

});
    
});
  
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
       ['City', 'peakPower','temperature', 'solarPlant','year'],
          ['Ciudad Real', 70,0.7,'Parque fotovoltaico puertollano',2010],
          ['Cuenca', 60,0.7,'Parque fotovoltaico Olmedilla de Alarcon',2010],
          ['Caceres', 34,0.7,'Planta solar fotovoltaica La Magascona y La Magasquilla',2010],
          ['la Rioja', 30, 0.7, 'Planta solar Arnedo',2010],
          ['Cuenca', 30, 0.7, 'Planta solar Osa de la Vega',2010],
          ['Sevilla', 10, 1.5,'Sevilla Plant',2015]
      ]);

      var options = {
        title: 'Correlation between peakPower, temperature rate ' +
               'and solarPlant of some Spanish countries (2010-2015)',
        hAxis: {title: 'peakPower'},
        vAxis: {title: 'Temperature'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }

var chart = c3.generate({
 
    bindto: '#chart',
    
    data: {
      columns: [
        ['peakPower', 70, 60, 34, 30, 30, 10],
        ['temperature',0.7,0.7,0.7,0.7,0.7,1.5]
      ]
    }
});


 }]);
 
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

  function getGlobalWarmings() {
   $http.get(api + search).then(function(response) {
    $scope.solarPlants = response.data;
   });
   search = "?";
  }

  getGlobalWarmings();

  $scope.addGlobal = function() {
   $http.post(api, $scope.newGlobal).then(function successCallback(response) {
    $scope.status = "(New solar plant has been added )";
    window.alert("El recurso se ha creado con exito!");
    getGlobalWarmings();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "( FAIL: solar plant does not have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "( FAIL: solar plant already exists!!!)";
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
   $scope.status = "(Results)";

  };

  $scope.getGlobalNext = function() {


   if (offset < n_elem - 10) {
    offset += limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }
   else {
    window.alert("No hay pagina siguiente");
    offset = -10;
   }

   getGlobalWarmings();
  };


  $scope.getGlobalPrev = function() {
   if (offset > 0) {
    offset -= limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }
   else {
    window.alert("No hay pagina anterior");
   }
   getGlobalWarmings();
  };

  $scope.deleteGlobal = function(solarPlant) {
   $http.delete(api + "/" + solarPlant).then(function(response) {
    window.alert("El dato se ha borrado con exito");

    $scope.status = "(Solar plant has been eliminated )";
    getGlobalWarmings();
   });
  };

  $scope.deleteAllGlobal = function() {
   $http.delete(api).then(function(response) {
    window.alert("Los datos se han borrado con exito");
    $scope.status = "(All solar plant have been eliminated )";
    getGlobalWarmings();

   });
  };



  $scope.loadInitialData = function() {
   $http.get(api + "/loadInitialData").then(function(response) {
    window.alert("Los datos se han cargado con exito");
    getGlobalWarmings();
    $scope.status = "(All the data of the solar plant have been charged)";
   });
  };


  function getGlobalWarmingsCount() {
   $http.get(api + search).then(function(response) {
    $scope.solarPlants = response.data;
    n_elem = response.data.length;
   });
   search = "?";
  }


  $http
   .get("/api/v2/global-warmings")
   .then(function(response) {
    console.log(response.data);
    
   
Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Global Warmings'
    }, 
    subtitle: {
        text: 'Global warming and a possible means of how to avoid it (photovoltaic energy)'
    },
    xAxis: {
     
     categories : response.data.map(function(d) {
         return d.year;
     })
     
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Peak power (MW)',
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
        
        data: response.data.map(function(d) {return parseInt(d.peakPower)})
    },{
        name: 'Temperature',
        data: response.data.map(function(d) {return parseInt(d.temperature)})
    }
    
    ]
  });
});
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawSeriesChart);

  function drawSeriesChart() {

   var data = google.visualization.arrayToDataTable([
    ['City', 'peakPower', 'temperature', 'solarPlant', 'year'],
    ['Ciudad Real', 70, 0.7, 'Parque fotovoltaico puertollano', 2010],
    ['Cuenca', 60, 0.7, 'Parque fotovoltaico Olmedilla de Alarcon', 2010],
    ['Caceres', 34, 0.7, 'Planta solar fotovoltaica La Magascona y La Magasquilla', 2010],
    ['la Rioja', 30, 0.7, 'Planta solar Arnedo', 2010],
    ['Cuenca', 30, 0.7, 'Planta solar Osa de la Vega', 2010]
   ]);
console.log(data);
   var options = {
    title: 'Peaks of maximum power that a solar plant gives off and the effect that it produces in the increase of the temperature (for years)',
    hAxis: { title: 'peakPower' },
    vAxis: { title: 'Temperature' },
    bubble: { textStyle: { fontSize: 11 } }
   };

   var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
   chart.draw(data, options);
  }

  var chart = c3.generate({
    data: {
        columns: [
            ['data1', 30],
            ['data2', 120],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Greater solar plants"
    }
});

setTimeout(function () {
    chart.load({
        columns: [
            ["Parque fotovoltaico puertollano",70 ],
            ["Parque fotovoltaico Olmedilla de Alarcon", 60],
            ["Planta solar fotovoltaica La Magascona y La Magasquilla", 34],
            ["Planta solar Arnedo",30],
            ["Planta solar Osa de la Vega",30]
        ]
    });
}, 1500);

setTimeout(function () {
    chart.unload({
        ids: 'data1'
    });
    chart.unload({
        ids: 'data2'
    });
}, 2500);


 }]);
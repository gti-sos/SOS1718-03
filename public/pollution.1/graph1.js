 /* global angular */
 /* global Highcharts */
 /* global google */
 /* global c3 */
 angular.module("StatsApp").controller("graph1", ["$scope", "$http", function($scope, $http) {
    var ultimo = [];
    var labelsAux = [];
    var labels= [];
    var valoresAux = [];
    var valores = [];
  $http
   .get("/api/v2/pollution-cities")
   .then(function(response){
       
    for(var i=0;i<response.data.length;i++){
        var ultimoAux = [];
        for(var j=0; j<1;j++){
             ultimoAux.push(response.data[i].station);
             ultimoAux.push(parseInt(response.data[i].nitrous));
        }
        ultimo.push(ultimoAux);
    }  
    
    for(var z=0;z<response.data.length;z++){
        labelsAux[z] = (response.data[z].city);
    }  
    labels = labelsAux;
    
    for(var z=0;z<response.data.length;z++){
        valoresAux[z] = parseInt((response.data[z].car));
    } 
    
    valores = valoresAux;
    console.log(labels);
    console.log(valores);
    
    
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
            text: 'nitrous (µgramos/m3)'
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
        data: ultimo,
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
    

      new Chartist.Bar('.ct-chart', {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  series: [
    [5, 4, 3, 7, 5, 10, 3],
    [3, 2, 9, 5, 4, 6, 4]
  ]
}, {
  seriesBarDistance: 10,
  reverseData: true,
  horizontalBars: true,
  axisY: {
    offset: 70
  }
});
 });

 }]);
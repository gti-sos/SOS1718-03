 /* global angular */
 /* global Highcharts */
 /* global google */
 /* global c3 */
  /* global Chartist */
 angular.module("StatsApp").controller("graph1", ["$scope", "$http", function($scope, $http) {
    var ultimo = [];
    var labelsAux = [];
    var labels= [];
    var valoresAux = [];
    var valores = [];
    var googleData = [];
    googleData.push(['station','nitrous','car','city','year']);


  $http
   .get("/api/v2/pollution-cities")
   .then(function(response){
       
    for(var i=0;i<response.data.length;i++){
    var googleDataAux = [];
          googleDataAux.push(response.data[i].station);
          googleDataAux.push(parseInt(response.data[i].nitrous));
          googleDataAux.push(parseInt(response.data[i].car));
          googleDataAux.push(response.data[i].city);
          googleDataAux.push(parseInt(response.data[i].year));
    
    
     googleData.push(googleDataAux);
} 
    
    for(i=0;i<response.data.length;i++){
        var ultimoAux = [];
        for(var j=0; j<1;j++){
             ultimoAux.push(response.data[i].station);
             ultimoAux.push(parseInt(response.data[i].nitrous));
        }
        ultimo.push(ultimoAux);
    }  
    
    for(var z=0;z<response.data.length;z++){
        labelsAux[z] = (response.data[z].city);
        valoresAux[z] = parseInt(response.data[z].car);
    }  
    labels = labelsAux;
    valores = valoresAux;

    
    
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
console.log(googleData);
      var data = google.visualization.arrayToDataTable(googleData);

      var options = {
        title: 'Correlation between nitrous, car ' +
               'and stations of some Spanish countries (2008-2014)',
        hAxis: {title: 'nitrous'},
        vAxis: {title: 'car'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
    

  new Chartist.Bar('.ct-chart', {
  labels: labels,
  series: [valores]},
  {
  seriesBarDistance: 10,
  reverseData: true,
  horizontalBars: true,
  axisY: {
    offset: 70
  }
});


 });

 }]);
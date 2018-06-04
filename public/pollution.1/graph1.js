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
    


  $http
   .get("/api/v2/pollution-cities")
   .then(function(response){
    
    
    for(i=0;i<response.data.length;i++){
        var ultimoAux = [];
        for(var j=0; j<1;j++){
             ultimoAux.push(response.data[i].station);
             ultimoAux.push(parseInt(response.data[i].nitrous));
        }
        ultimo.push(ultimoAux);
    }  
    
    

    
    
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
  



       
      googleData.push(['city','carr','nitrous']);


    for(var i=0;i<response.data.length;i++){
    var googleDataAux = [];
    
          googleDataAux.push(response.data[i].city);
          googleDataAux.push(parseInt(response.data[i].car));
          googleDataAux.push(parseInt(response.data[i].nitrous));
         
    
     googleData.push(googleDataAux);
     
}  
       google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': 'AIzaSyB2u3e-OrPN3bPcJXvmvUX4EuHS0Up_jFg'
         });
         
      google.charts.setOnLoadCallback(drawRegionsMap);
   
      function drawRegionsMap() {
        var datos = [
            
                ['city','car']
            
            ];
        
        response.data.map(function(d) {
            var total ="car:" + Number(d['car']) + ", " + "nitrous:" + Number(d['nitrous']);
            datos.push([d['city'],total]);
        });
        
        var data = google.visualization.arrayToDataTable(datos);
        

        var options = {
            region : 'ES',
            displayMode: 'markers',
            colorAxis: {colors: ['green','blue']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
    


    for(var z=0;z<response.data.length;z++){
        labelsAux[z] = (response.data[z].city);
        valoresAux[z] = parseInt(response.data[z].car);
    }  
    labels = labelsAux;
    valores = valoresAux;

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
 /* global Highcharts */
 /* global google */
 /* global c3 */
 /* global angular*/
angular.module("StatsApp")
    .controller("graph2",
        ["$scope", "$http", function($scope, $http) {
var googleData = [];
var ultimo = [];
googleData.push(['name', 'solarPlant', 'year', 'temperature', 'peakPower']);


$http
   .get("/api/v2/global-warmings")
   .then(function(response) {

for(var i=0;i<response.data.length;i++){
    var googleDataAux = [];

    for(var j=0; j<1;j++){
         googleDataAux.push(response.data[i].name);
         googleDataAux.push(response.data[i].peakPower);
         googleDataAux.push(response.data[i].temperature);
         googleDataAux.push(response.data[i].solarPlant);
         googleDataAux.push(response.data[i].year);
         
         
    }
    googleData.push(googleDataAux);
} 

for(i=0;i<response.data.length;i++){
    var ultimoAux = [];
    for(j=0; j<1;j++){
         ultimoAux.push(response.data[i].solarPlant);
         ultimoAux.push(parseInt(response.data[i].peakPower));
    }
    ultimo.push(ultimoAux);
}
    
console.log(googleData);
    
   
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

   var data = google.visualization.arrayToDataTable(googleData);
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
        columns: 
            ultimo
        
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
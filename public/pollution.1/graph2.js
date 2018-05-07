 /* global Highcharts */
 /* global google */
 /* global c3 */
 /* global angular*/
angular.module("StatsApp")
    .controller("graph2",
        ["$scope", "$http", function($scope, $http) {
         
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
 /* global Highcharts */
 /* global google */
 /* global c3 */
 /* global angular*/

 angular.module("StatsApp")
     .controller("graph2", ["$scope", "$http", function($scope, $http) {
         var googleData = [];
         var ultimo = [];
         googleData.push(['name', 'peakPower', 'temperature']);
         $http
             .get("/api/v2/global-warmings")
             .then(function(response) {

                 for (var i = 0; i < response.data.length; i++) {
                     var googleDataAux = [];

                     googleDataAux.push(response.data[i].name);
                     googleDataAux.push(parseInt(response.data[i].peakPower));
                     googleDataAux.push(parseInt(response.data[i].temperature));


                     googleData.push(googleDataAux);
                 }
                 console.log(googleData);

                 for (i = 0; i < response.data.length; i++) {
                     var ultimoAux = [];

                     ultimoAux.push(response.data[i].solarPlant);
                     ultimoAux.push(parseInt(response.data[i].peakPower));

                     ultimo.push(ultimoAux);
                 }

                 console.log(googleData);
                 Highcharts.chart('container', {
                     chart: {
                         type: 'area'
                     },
                     title: {
                         text: 'Global Warmings'
                     },
                     xAxis: {

                         categories: response.data.map(function(d) {
                             return d.year;

                         })
                     },

                     tooltip: {
                         pointFormat: '{series.name} <b>{point.y:,.0f}</b><br /> '
                     },


                     series: [{
                         name: 'peakPower',

                         data: response.data.map(function(d) { return parseInt(d.peakPower) })
                     }, {
                         name: 'Temperature',
                         data: response.data.map(function(d) { return parseInt(d.temperature) })
                     }]
                 });

                 google.charts.load('current', {
                     'packages': ['geochart'],
                     'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                 });

                 google.charts.setOnLoadCallback(drawRegionsMap);

                 function drawRegionsMap() {
                     var datos = [

                         ['name', 'peakPower']

                     ];

                     response.data.map(function(d) {
                         var total = "peakPower:" + Number(d['peakPower']) + ", " + "temperature:" + Number(d['temperature']);
                         datos.push([d['name'], total]);
                     });

                     var data = google.visualization.arrayToDataTable(datos);


                     var options = {
                         region: 'ES',
                         displayMode: 'markers',
                         colorAxis: { colors: ['green', 'blue'] }
                     };

                     var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                     chart.draw(data, options);
                 }

                 var chart = c3.generate({
                     data: {
                         columns: [
                             ['data1', 30],
                             ['data2', 120],
                         ],
                         type: 'donut',
                         onclick: function(d, i) { console.log("onclick", d, i); },
                         onmouseover: function(d, i) { console.log("onmouseover", d, i); },
                         onmouseout: function(d, i) { console.log("onmouseout", d, i); }
                     },
                     donut: {
                         title: "Greater solar plants"
                     }
                 });

                 setTimeout(function() {
                     chart.load({
                         columns: ultimo

                     });
                 }, 1500);

                 setTimeout(function() {
                     chart.unload({
                         ids: 'data1'
                     });
                     chart.unload({
                         ids: 'data2'
                     });
                 }, 2500);
             });
     }]);
 
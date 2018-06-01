 /* global Highcharts */
 /* global google */
 /* global c3 */
 /* global angular*/

 angular.module("StatsApp")
     .controller("graph2", ["$scope", "$http", function($scope, $http) {
             var googleData = [];



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

                             var ultimo = [];
                             var lista = {};
                             console.log(ultimo);
                             for (var i = 0; i < response.data.length; i++) {

                                 lista = { y: parseInt(response.data[i].peakPower), label: response.data[i].solarPlant };
                                 ultimo.push(lista);

                                 console.log(ultimo);
                             }
                             console.log(ultimo);

                             

                                 var chart = new CanvasJS.Chart("chartContainer", {
                                     animationEnabled: true,
                                     title: {
                                         text: "SolarPlant",
                                         horizontalAlign: "left"
                                     },
                                     data: [{
                                         type: "doughnut",
                                         startAngle: 60,
                                         //innerRadius: 60,
                                         indexLabelFontSize: 17,
                                         indexLabel: "{label} - #percent%",
                                         toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                                         dataPoints: 
                                           ultimo
                                         

                                     }]
                                 });
                                 chart.render();

                            
                         
                 
                 
                     
                });
     }]);     
 /* global angular*/

 angular.module("StatsApp").controller("basketball", ["$scope", "$http", function($scope, $http) {

     console.log("List Ctrl initialized!");
     var apiPropia = "/api/v2/global-warmings";
     var api2 = "https://sos1718-11.herokuapp.com/api/v2/basketball-stats";


     $http.get(api2).then(function(response1) {
         $http.get(apiPropia).then(function(response2) {

             var ultimo = [];
             var ultimo1 = [];


            //He tenido que  dar tan solo dos vueltas al bucle ya que nuestra grafica recoge 5 datos y no mostraba los mios.  
             for (var i = 0; i < 2; i++) {

                 ultimo.push(response1.data[i].stadium);
                 ultimo1.push(response1.data[i].first);

             }
             for (var i = 0; i < response2.data.length; i++) {

                 ultimo.push(response2.data[i].name);
                 ultimo1.push(response2.data[i].peakPower);

             }

             var names = ultimo;
             var data = ultimo1;
             var dataSet = anychart.data.set(data);
             var palette = anychart.palettes.distinctColors().items(['#64b5f6', '#1976d2', '#ef6c00', '#ffd54f', '#455a64', '#96a6a6', '#dd2c00', '#00838f', '#00bfa5', '#ffa000']);

             var makeBarWithBar = function(gauge, radius, i, width, without_stroke) {
                 var stroke = '1 #e5e4e4';
                 if (without_stroke) {
                     stroke = null;
                     gauge.label(i)
                         .text(names[i] + ', <span style="">' + data[i] + '%</span>') // color: #7c868e
                         .useHtml(true);
                     gauge.label(i)
                         .hAlign('center')
                         .vAlign('middle')
                         .anchor('right-center')
                         .padding(0, 10)
                         .height(width / 2 + '%')
                         .offsetY(radius + '%')
                         .offsetX(0);
                 }

                 gauge.bar(i).dataIndex(i)
                     .radius(radius)
                     .width(width)
                     .fill(palette.itemAt(i))
                     .stroke(null)
                     .zIndex(5);
                 gauge.bar(i + 100).dataIndex(5)
                     .radius(radius)
                     .width(width)
                     .fill('#F5F4F4')
                     .stroke(stroke)
                     .zIndex(4);

                 return gauge.bar(i)
             };

             anychart.onDocumentReady(function() {
                 var gauge = anychart.gauges.circular();
                 gauge.data(dataSet);
                 gauge.fill('#fff')
                     .stroke(null)
                     .padding(0)
                     .margin(100)
                     .startAngle(0)
                     .sweepAngle(270);

                 var axis = gauge.axis().radius(100).width(1).fill(null);
                 axis.scale()
                     .minimum(0)
                     .maximum(100)
                     .ticks({
                         interval: 1
                     })
                     .minorTicks({
                         interval: 1
                     });
                 axis.labels().enabled(false);
                 axis.ticks().enabled(false);
                 axis.minorTicks().enabled(false);
                 makeBarWithBar(gauge, 100, 0, 17, true);
                 makeBarWithBar(gauge, 80, 1, 17, true);
                 makeBarWithBar(gauge, 60, 2, 17, true);
                 makeBarWithBar(gauge, 40, 3, 17, true);
                 makeBarWithBar(gauge, 20, 4, 17, true);

                 gauge.margin(50);
                 gauge.title().text('Integration with api basketball' +
                     '<br/><span style="color:#929292; font-size: 12px;">(stadium and first)</span>').useHtml(true);
                 gauge.title()
                     .enabled(true)
                     .hAlign('center')
                     .padding(0)
                     .margin([0, 0, 20, 0]);

                 gauge.container('container');
                 gauge.draw();
             });
         });
     });
 }]);
 
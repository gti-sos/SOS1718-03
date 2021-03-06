 /* global angular*/
 /* global anychart*/

 angular.module("StatsApp").controller("hospitalstats", ["$scope", "$http", function($scope, $http) {

  console.log("List Ctrl initialized!");
  var apiPropia = "/api/v2/global-warmings";
  var api2 = "https://sos1718-12.herokuapp.com/api/v1/hospital-stats";


  $http.get(api2).then(function(response1) {
   $http.get(apiPropia).then(function(response2) {

    var ultimo = [];

    for (var i = 0; i < response1.data.length; i++) {
     var ultimoAux = [];
     ultimoAux.push(response1.data[i].country);
     ultimoAux.push(response1.data[i].bed);
     ultimoAux.push(response1.data[i].expense);
     ultimo.push(ultimoAux);

    }
    for (var i = 0; i < response2.data.length; i++) {
     var ultimoAux1 = [];
     ultimoAux1.push(response2.data[i].name);
     ultimoAux1.push(response2.data[i].temperature);
     ultimoAux1.push(response2.data[i].peakPower);
     ultimo.push(ultimoAux1);


    }
    console.log(ultimo);


    /*
        for (i = 0; i < response1.data.length; i++) {

         var lista = {
          'x': 0,
          'bed': 1,
          'expense': 2
         };
         
         for (i = 0; i < response2.data.length; i++) {

         var lista = {
          'x': 0,
          'peakPower': 1,
          'temperature': 2
         };


        }*/

    anychart.onDocumentReady(function() {
     // create column chart
     var chart = anychart.column();

     // set chart title
     chart.title('Cherry Chart');

     // create data set on our data
     var dataSet = anychart.data.set(
      ultimo
     );

     // set chart padding
     chart.padding().top(50);

     // map data for the series, take name from the zero column,
     // low value from the first column and high value from the second column of data set
     var seriesData = dataSet.mapAs({
      'x': 0,
      'low': 1,
      'high': 2
     });

     // create first series with mapped data
     var series = chart.rangeColumn(seriesData);

     // get shapes
     var shapes = series.rendering().shapes();

     // add 'line' shape to shapes group
     shapes.push({
      // shape name
      name: 'line',
      // shape type ('path', 'circle', 'ellipse' or 'rect')
      shapeType: 'path',
      // ZIndex for the balance of shapes relative to each other
      zIndex: 2
     });

     // choose the color palettes of the fill point
     series.fill(function() {
      return anychart.color.lighten(chart.palette().itemAt(this.index), 0.25);
     });
     // choose the color palettes of the stroke point
     series.stroke(function() {
      return anychart.color.darken(chart.palette().itemAt(this.index), 0.1);
     });
     // set rendering settings
     series.rendering()
      // set point function to drawing
      .point(drawer)
      // set update point function to drawing, change the point shape when the state changes
      .updatePoint(drawer)
      // set shapes
      .shapes(shapes);

     // set titles for Y-axis
     chart.yAxis().title('Forecast Revenue in Dollars');
     // set minimum for y-scale
     chart.yScale()
      .minimum(0)
      .ticks({
       interval: 5
      });
     // set container id for the chart
     chart.container('container');
     // initiate chart drawing
     chart.draw();
    });

    function drawer() {
     // if missing (not correct data), then skipping this point drawing
     if (this.missing) {
      return;
     }

     // get shapes group
     var shapes = this.shapes || this.getShapesGroup(this.pointState);
     // column width
     var columnWidth = 5;
     // calculate the left value of the x-axis
     var leftX = this.x - columnWidth / 2;
     // calculate the right value of the x-axis
     var rightX = leftX + columnWidth / 2;
     // stage width
     var stageWidth = shapes.line.getStage().width();

     // if pointState > 0, then hover or select point state
     if (this.pointState > 0) {
      shapes.line
       // resets all 'line' operations
       .clear()
       // draw dash line
       .moveTo(0, this.low)
       .lineTo(leftX, this.low)
       .moveTo(0, this.high)
       .lineTo(leftX, this.high)
       .moveTo(rightX, this.low)
       .lineTo(stageWidth, this.low)
       .moveTo(rightX, this.high)
       .lineTo(stageWidth, this.high)
       // set stroke to line, get color from shapes.path
       .stroke({
        color: shapes.path.stroke().color,
        dash: '5 10'
       })

     }
     else {
      // pointState === 0, then normal point state
      // resets all 'line' operations
      shapes.line.clear();
      shapes.path
       // resets all 'path' operations
       .clear()
       // draw bulb
       .moveTo(leftX, this.low)
       .lineTo(leftX, this.high)
       .lineTo(rightX, this.high)
       .lineTo(rightX, this.low)
       .arcToByEndPoint(leftX, this.low, columnWidth * 2, columnWidth * 2, true, true)
       // close by connecting the last point with the first straight line
       .close();
     }
    }
   });
  });
 }]);
 
/*global angular*/
/*global AmCharts*/


angular.module("StatsApp")
  .controller("graphWorld", ["$scope", "$http",
    function($scope, $http) {
      console.log("List Ctrl initialized!");
      var apiPropia = "/api/v2/pollution-cities";
      var api = "https://sos1718-05.herokuapp.com/api/v1/world-stats";


      $http.get(api).then(function(response1) {
        $http.get(apiPropia).then(function(response2) {
          var ultimoAux = [];
          for (var i = 0; i < 5; i++) {
            ultimoAux.push({ y: response1.data[i].sale, label: response1.data[i].artist });
          }
          for (var i = 0; i < 5; i++) {
            ultimoAux.push({ y: response2.data[i].nitrous, label: response2.data[i].city });
          }



          var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
              text: "Sale and Nitrous Stats"
            },
            data: [{
              type: "funnel",
              indexLabelPlacement: "inside",
              indexLabelFontColor: "white",
              toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
              indexLabel: "{label} ({percentage}%)",
              dataPoints: ultimoAux
            }]
          });
          calculatePercentage();
          chart.render();

          function calculatePercentage() {
            var dataPoint = chart.options.data[0].dataPoints;
            var total = dataPoint[0].y;
            for (var i = 0; i < dataPoint.length; i++) {
              if (i == 0) {
                chart.options.data[0].dataPoints[i].percentage = 100;
              }
              else {
                chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
              }
            }
          }



        });
      });
    }
  ]);

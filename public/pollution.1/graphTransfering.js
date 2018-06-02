/*global angular*/


angular.module("StatsApp")
  .controller("graphTransfering", ["$scope", "$http",
    function($scope, $http) {
      console.log("List Ctrl initialized!");
      var apiPropia = "/api/v2/pollution-cities";
      var api = "proxyTRA/api/v1/transferincomes-stats";


      $http.get(api).then(function(response1) {
        $http.get(apiPropia).then(function(response2) {
          

          var x = response2.data.map(function(d) { return parseInt(d.nitrous) });
                    console.log(x);

          var y = response1.data.map(function(d) { return parseInt(d.tilessexp) });
                    console.log(y);


          var trace2 = {
            x: x,
            y: y,
            name: 'density',
            colorscale: [
              [0, 'rgb(255,255,255)'],
              [.33, 'rgb(0, 255, 0)'],
              [1, 'rgb(255,0,0)']
            ],
            reversescale: false,
            showscale: false,
            type: 'histogram2dcontour',
            line: {
              width: 0
            },
            contours: {
              coloring: 'heatmap'
            }
          };
          var data = [trace2];
          var layout = {
            showlegend: false,
            autosize: false,
            width: 600,
            height: 550,
            margin: { t: 50 },
            hovermode: 'closest',
            bargap: 0,
            xaxis: {
              domain: [0, 0.85],
              showgrid: false,
              zeroline: false
            },
            yaxis: {
              domain: [0, 0.85],
              showgrid: false,
              zeroline: false
            }
          };
          Plotly.newPlot('myDiv', data, layout);

        });
      });
    }
  ]);
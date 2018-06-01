/*global angular*/
/*global AmCharts*/


angular.module("StatsApp")
 .controller("graphGroup", ["$scope", "$http",
  function($scope, $http) {
   console.log("List Ctrl initialized!");
   var apiPropia = "/api/v2/pollution-cities";
   var api = "https://sos1718-03.herokuapp.com/api/v1/global-warmings";


   $http.get(api).then(function(response1) {
    $http.get(apiPropia).then(function(response2) {
     var ultimoAux = [];
     for (var i = 0; i < response2.data.length; i++) {
      var tdDetail = { country: response2.data[i].city, visits: response2.data[i].nitrous, color: "#FF0F00" };
      ultimoAux.push(tdDetail);
     }
     for (i = 0; i < response1.data.length; i++) {
      tdDetail = { country: response1.data[i].name, visits: response1.data[i].peakPower, color: "#04D215" };
      ultimoAux.push(tdDetail);
     }
     console.log(ultimoAux);



     var chart = AmCharts.makeChart("chartdiv", {
      "theme": "none",
      "type": "serial",
      "startDuration": 2,
      "dataProvider": ultimoAux,
      "valueAxes": [{
       "position": "left",
       "title": "Visitors"
      }],
      "graphs": [{
       "balloonText": "[[category]]: <b>[[value]]</b>",
       "fillColorsField": "color",
       "fillAlphas": 1,
       "lineAlpha": 0.1,
       "type": "column",
       "valueField": "visits"
      }],
      "depth3D": 20,
      "angle": 30,
      "chartCursor": {
       "categoryBalloonEnabled": false,
       "cursorAlpha": 0,
       "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
       "gridPosition": "start",
       "labelRotation": 90
      },
      "export": {
       "enabled": true
      }

     });/*
     var chart = AmCharts.makeChart("chartdiv", {
         "type": "pie",
         "theme": "light",
         "innerRadius": "40%",
         "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
         "dataProvider": ultimoAux,
         "balloonText": "[[value]]",
         "valueField": "visits",
         "titleField": "country",
         "balloon": {
             "drop": true,
             "adjustBorderColor": false,
             "color": "#FFFFFF",
             "fontSize": 16
         },
         "export": {
             "enabled": true
         }
     });*/
    });
   });
  }
 ]);

 /* global Chart */
 /* global angular*/
 
angular.module("StatsApp").controller("war",["$scope", "$http", function($scope, $http) {
    
    console.log("List Ctrl initialized!");
       var apiPropia = "/api/v2/global-warmings";
        var api2 = "proxyWAR/api/people/?format=json";
            
     
       $http.get(api2).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {
                    
                    
                 var ultimo = [];
                   for (var i=0 ; i < response2.data.length; i++){
                       
                       ultimo.push({
                                    label: "Test "+ i,
                                    backgroundColor: "rgba(21,163,"+(i*50)+",0.2)",
                                    data: [response2.data[i].temperature, response2.data[i].peakPower,
                                    response1.data.results[i].mass, response1.data.results[i].height]
                                    });
                    }
                    
    
    
    
var marksCanvas = document.getElementById("marksChart");

var marksData = {
  labels: ["Temperature", "Peak Power", "mass", "height"],
  datasets: ultimo
};

var radarChart = new Chart(marksCanvas, {
  type: 'radar',
  data: marksData

});
});
});
}]);
 /* global Highcharts */
 /* global angular*/
 
angular.module("StatsApp").controller("citybik",["$scope", "$http", function($scope, $http) {
    
    console.log("List Ctrl initialized!");
       var apiPropia = "/api/v2/global-warmings";
        var api2 = "proxyCIT/v2/networks";
            
     
       $http.get(api2).then(function(response1) {
                $http.get(apiPropia).then(function(response2) {
                    
                    var ultimo = [];
                   
                     for (var i = 0; i < 5; i++) {
                            
                         ultimo.push([-50,100,response1.data.networks[i].location.latitude,100,200]);
        
                     }
                      for (var i = 0; i < 5; i++) {
                            
                         ultimo.push([-50,100,response2.data[i].peakPower,100,200]);
        
                     }
                     
                    
    
    
    
var marksCanvas = document.getElementById("marksChart");

var marksData = {
  labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
  datasets: [{
    label: "Student A",
    backgroundColor: "rgba(200,0,0,0.2)",
    data: [65, 75, 70, 80, 60, 80]
  }, {
    label: "Student B",
    backgroundColor: "rgba(0,0,200,0.2)",
    data: [54, 65, 60, 70, 70, 75]
  }]
};

var radarChart = new Chart(marksCanvas, {
  type: 'radar',
  data: marksData

});
});
});
}]);
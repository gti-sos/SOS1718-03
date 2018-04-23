 /* global angular */
 angular.module("pollutionApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v2/pollution-cities";
  
   function getPollutionCities(){
      $http.get(api).then(function(response) {
       $scope.stations = response.data;
      });
   }
  
  getPollutionCities();


  $scope.addPollution = function() {
   $http.post(api, $scope.newPollution).then(function successCallback(response) {
    $scope.status = "Status : " + response.status + "( Pollution added correctly)";
    getPollutionCities();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "Status : " + response.status + "( FAIL: Pollution does not have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "Status : " + response.status + "( FAIL: Pollution already exists!!!)";
    }
   });
   getPollutionCities();

  };

  $scope.deletePollution = function(station) {
   //console.log("Pollution to be deleted: " + station);
   $http.delete(api + "/" + station).then(function(response) {
    //$scope.status = "Status : " + response.status + "( Pollution deleted correctly)";
    //console.log(JSON.stringify(response, null, 2))
   window.alert("El dato se ha borrado con exito");

    getPollutionCities();
   });
  };

  $scope.deleteAllPollution = function() {
   $http.delete(api).then(function(response) {
    //$scope.status = "Status : " + response.status + "(All pollutions deleted correctly)";
    window.alert("Los datos se han borrado con exito");
    getPollutionCities();

   });
  };



 

  



 }]);
 
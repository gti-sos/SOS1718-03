 /* global angular */
 angular.module("StatsApp").controller("listCtrlPollution", ["$scope", "$http", function($scope, $http) {
  
  console.log("List Ctrl initialited");
  var api = "/api/v2/pollution-cities";
  var search = "?";
  var offset = -10;
  var limit = 10;
  var n_elem;
    
  getPollutionCitiesCount();

   function getPollutionCities(){
      $http.get(api + search).then(function(response) {
       $scope.stations = response.data;
      });
      search = "?";
   }
  
  getPollutionCities();

  $scope.addPollution = function() {
   $http.post(api, $scope.newPollution).then(function successCallback(response) {
    $scope.status = "Status ( Pollution added correctly)";
    window.alert("El recurso se ha creado con exito!");
    getPollutionCities();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "Status : ( FAIL: Pollution does not have expected fields)";
    }
    if (response.status == 409) {
     window.alert("Pollution already exists");
     $scope.status = "Status : ( FAIL: Pollution already exists!!!)";
    }
   });
   getPollutionCities();

  };
 
   $scope.getPollution = function() {
   if ($scope.newPollution.from) {
    search += ("&from=" + $scope.newPollution.from);
   }
   if ($scope.newPollution.to) {
    search += ("&to=" + $scope.newPollution.to);
   }
   getPollutionCities();

  };
  
  $scope.getPollutionNext = function() {
  
   
   if (offset<n_elem-limit) {
   offset += limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }else{
        window.alert("No hay pagina siguiente");
        offset = -limit;
   }
   
   getPollutionCities();
  };
  
  
  $scope.getPollutionPrev = function() {
   if (offset>0) {
    offset -= limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }else{
        window.alert("No hay pagina anterior");
   }
   getPollutionCities();
  };


  $scope.deletePollution = function(station) {
   $http.delete(api + "/" + station).then(function(response) {
    $scope.status = "Status : ( Pollution deleted correctly)";
    window.alert("El dato se ha borrado con exito");
    getPollutionCities();
   });
  };

  $scope.deleteAllPollution = function() {
   $http.delete(api).then(function(response) {
    $scope.status = "Status : (All pollutions deleted correctly)";
    window.alert("Los datos se han borrado con exito");
    getPollutionCities();
   });
  };



 
$scope.loadInitialData = function() {
   $http.get(api + "/loadInitialData").then(function(response) {
    window.alert("Los datos se han cargado con exito");
    getPollutionCities();
    });
  };

  
function getPollutionCitiesCount(){
      $http.get(api + search).then(function(response) {
       $scope.stations = response.data;
       n_elem = response.data.length;
      });
      search = "?";
   }



}]);

 
 /* global angular */

 angular.module("StatsApp").controller("listCtrlGlobal", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");




  console.log(2);
  var api = "/api/v2/global-warmings";
  var search = "?";
  var offset = -10;
  var limit = 10;
  var n_elem;

  getGlobalWarmingsCount();


  function getGlobalWarmings() {
   $http.get(api + search).then(function(response) {
    $scope.solarPlants = response.data;
   });
   search = "?";
  }

  getGlobalWarmings();

  $scope.addGlobal = function() {
   $http.post(api, $scope.newGlobal).then(function successCallback(response) {
    $scope.status = "(New solar plant has been added )";
    window.alert("El recurso se ha creado con exito!");
    getGlobalWarmings();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "( FAIL: solar plant does not have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "( FAIL: solar plant already exists!!!)";
    }
   });
   getGlobalWarmings();

  };

  $scope.getGlobal = function() {
   if ($scope.newGlobal.from) {
    search += ("&from=" + $scope.newGlobal.from);
   }
   if ($scope.newGlobal.to) {
    search += ("&to=" + $scope.newGlobal.to);
   }
   getGlobalWarmings();
   $scope.status = "(Results)";

  };

  $scope.getGlobalNext = function() {


   if (offset < n_elem - 10) {
    offset += limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }
   else {
    window.alert("No hay pagina siguiente");
    offset = -10;
   }

   getGlobalWarmings();
  };


  $scope.getGlobalPrev = function() {
   if (offset > 0) {
    offset -= limit;
    search += ("&offset=" + offset);
    search += ("&limit=" + limit);
    console.log(offset);
   }
   else {
    window.alert("No hay pagina anterior");
   }
   getGlobalWarmings();
  };

  $scope.deleteGlobal = function(solarPlant) {
   $http.delete(api + "/" + solarPlant).then(function(response) {
    window.alert("El dato se ha borrado con exito");

    $scope.status = "(Solar plant has been eliminated )";
    getGlobalWarmings();
   });
  };

  $scope.deleteAllGlobal = function() {
   $http.delete(api).then(function(response) {
    window.alert("Los datos se han borrado con exito");
    $scope.status = "(All solar plant have been eliminated )";
    getGlobalWarmings();

   });
  };



  $scope.loadInitialData = function() {
   $http.get(api + "/loadInitialData").then(function(response) {
    window.alert("Los datos se han cargado con exito");
    getGlobalWarmings();
    $scope.status = "(All the data of the solar plant have been charged)";
   });
  };


  function getGlobalWarmingsCount() {
   $http.get(api + search).then(function(response) {
    $scope.solarPlants = response.data;
    n_elem = response.data.length;
   });
   search = "?";
  }


  
 }]);
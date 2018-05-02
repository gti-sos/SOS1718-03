/* global angular */

angular.module("globalApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var globalUrl = "/api/v2/global-warmings/" + $routeParams.solarPlant;



            $http.get(globalUrl).then(function successCallback(response) {
                $scope.updatedGlobal = response.data;
            }, function errorCallback(response) {
                $scope.status = "FAIL of charge";
            });
            

            $scope.updateGlobal = function() {
                $http.put(globalUrl, $scope.updatedGlobal).then(function doneFilter(response) {
                   window.alert("El recurso se ha editado con exito, gracias!");
                   $location.path("/");
                    
                }, function failFilter(response) {
                    window.alert("El recurso no se ha editado con exito!");

                });
            };





        }
    ]);
/* global angular */

angular.module("appComun")
    .controller("editCtrlPollution", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var pollutionUrl = "/api/v2/pollution-cities/" + $routeParams.station;



            $http.get(pollutionUrl).then(function successCallback(response) {
                $scope.updatedPollution = response.data;
            }, function errorCallback(response) {
                $scope.status = "FAIL of charge";
            });
            

            $scope.updatePollution = function() {
                $http.put(pollutionUrl, $scope.updatedPollution).then(function doneFilter(response) {
                   window.alert("El recurso se ha editado con exito, gracias!");
                    $location.path("/");
                }, function failFilter(response) {
                    window.alert("El recurso no se ha editado con exito!");
                });
            };





        }
    ]);
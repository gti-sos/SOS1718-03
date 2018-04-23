/* global angular */

angular.module("pollutionApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var pollutionUrl = "/api/v2/pollution-cities/" + $routeParams.station;



            $http.get(pollutionUrl).then(function successCallback(response) {
                $scope.updatedPollution = response.data;
            }, function errorCallback(response) {
                $scope.status = "FAIL of charge" + response.status;
            });
            

            $scope.updatePollution = function() {
                $http.put(pollutionUrl, $scope.updatedPollution).then(function doneFilter(response) {
                   // $scope.status = "Status : " + response.status + "(Update correctly)";
                   // console.log(response.status);
                   window.alert("El recurso se ha editado con exito, gracias!");
                    $location.path("/");
                    
                }, function failFilter(response) {
                    window.alert("El recurso no se ha editado con exito!");
                    $scope.status = "Status : " + response.status + "(FAIL: update error)";

                });
            };





        }
    ]);
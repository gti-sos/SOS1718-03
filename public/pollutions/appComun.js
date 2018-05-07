/* global angular */
angular
    .module("appComun", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "menu.html"
            });

    });
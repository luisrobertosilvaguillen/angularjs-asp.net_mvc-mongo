; (function () {
    "use strict";
    angular.module('app.nav.ctrls', [])

	.controller('NavCtrl', ['$scope', '$http', '$location', 'AuthService', 'AccountService', '$sessionStorage', '$rootScope', function ($scope, $http, $location, AuthService, AccountService, $sessionStorage, $rootScope) {
	    $scope.currentUser = {
	        UserName: '',
	    };

        /** Limpia los datos de la sesión */
	    $scope.logout = function () {
	        AuthService.logout();
	    };

	    $scope.showAdmin = true;

	    $scope.$on('NavCtrl:userLogged', function (event, args) {

	        $scope.loadProfile();
	    });

	    $scope.loadProfile = function () {
	        $scope.currentUser = AuthService.getCurrentUser();
	    };


        // Call when loads
	    $scope.loadProfile();
	}]);
})();
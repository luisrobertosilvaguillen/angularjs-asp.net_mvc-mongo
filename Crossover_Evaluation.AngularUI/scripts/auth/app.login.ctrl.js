;(function() {
	"use strict";
	angular.module('app.login.ctrl', [])

	.controller('LoginCtrl', ['$scope', '$http', '$location', 'AuthService', 'AccountService', '$sessionStorage', '$rootScope', function ($scope, $http, $location, AuthService, AccountService, $sessionStorage, $rootScope) {
		$scope.loginData = {
			username: '',
			password: '',
			userRefreshTokens: false
		};

		$scope.login = function () {
		    if ($scope.loginData.username !== '' && (typeof $scope.loginData.username !== 'undefined')
                && $scope.loginData.password !== '' && (typeof $scope.loginData.password !== 'undefined')) {
		        var username = $scope.loginData.username;
		        $rootScope.$broadcast('AppCtrl:loader', { show: true });
		        AuthService.login($scope.loginData).then(function (response) {
		            AccountService.getUserByUsername(username).then(function (response) {
		                $sessionStorage.currentUser = response.data; // Almacenar el usuario actual en la sesión
		                // Undo stuff before moving to next location
		                $scope.undoSigninBackground();
		                // Redirección a dashboard
		                $location.path('/books');
                        // Notificar que el usuario está autenticado y que puede obtener la información para desplegarse
		                $rootScope.$broadcast('NavCtrl:userLogged');
		                $rootScope.$broadcast('AppCtrl:loader', { show: false });
		            },
                    function (err) {
                        console.log(err);
                        $rootScope.$broadcast('AppCtrl:loader', { show: false });
		            });
		        },
		        function (err) {
			        console.log(err);
			        if (typeof err !== 'undefined' && err != null && typeof err.error_description !== 'undefined') {
			            $rootScope.$broadcast('AppCtrl:toast', { anim: 'fade', type: 'danger', msg: err.error_description });
			        }
			        $rootScope.$broadcast('AppCtrl:loader', { show: false });
		        });
		    } else {
		        //alert('Fill required fields');
		        $rootScope.$broadcast('AppCtrl:toast', { anim: 'fade', type: 'danger', msg: 'Please enter username and password' });
		        $rootScope.$broadcast('AppCtrl:loader', { show: false });
		    }
		}

		$scope.undoSigninBackground = function () {
		    console.log('$scope.undoSigninBackground()');
		    // Undo changes
		    $('body').css('background', '');
		    $('body').css('-webkit-background-size', '');
		    $('body').css('-moz-background-size', '');
		    $('body').css('-o-background-size', '');
		    $('body').css('background-size', '');
		    $('.main-container').css('background-color', '');
		}

		$scope.$on("$destroy", function () {
		    $scope.undoSigninBackground();
		});

		$scope.init = function () {
		    // Try to put a background that covers the whole page, hacks. XD
		    $('body').css('background', 'url(/images/signin.jpg) no-repeat center center fixed');
		    $('body').css('-webkit-background-size', 'cover');
		    $('body').css('-moz-background-size', 'cover');
		    $('body').css('-o-background-size', 'cover');
		    $('body').css('background-size', 'cover');

		    // Set main-container transparency, so it can see through to background
		    $('.main-container').css('background-color', 'rgba(255,255,255,0.0)');
		}

		$scope.init();
	}]);
})();
;(function() {
    "use strict";
    angular.module('app.signup.ctrl', [])

	.controller('SignupCtrl', ['$scope', '$http', '$location', 'AuthService', 'AccountService', '$sessionStorage', '$rootScope', function ($scope, $http, $location, AuthService, AccountService, $sessionStorage, $rootScope) {
	    $scope.signupData = {
	        username: '',
	        email: '',
	        password: '',
	        confirmpassword: ''
	    };
	    $scope.Register = function () {
	        AccountService.createUser($scope.signupData).then(function (response) {
	            $rootScope.$broadcast('AppCtrl:toast', { anim: 'fade', type: 'success', msg: 'Successful registration' });
	            $location.path('/pages/signin');
	        }, function (err, status) {
	            console.log(err);
	            var errorMessage = '';
	            if (typeof err.modelState !== 'undefined' && typeof err.modelState !== null) {
	                for (var prop in err.modelState) {
	                    if (errorMessage != '')
	                        errorMessage += '<br/>';
	                    for (var index in err.modelState[prop])
	                        errorMessage += err.modelState[prop][index];
	                    $rootScope.$broadcast('AppCtrl:toast', { anim: 'fade', type: 'danger', msg: err.modelState[prop][index] });
	                }
	            }
	            if (errorMessage == '')
	                $rootScope.$broadcast('AppCtrl:toast', { anim: 'fade', type: 'danger', msg: 'An error has ocurred' });
	        });
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
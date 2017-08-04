; (function () {
    "use strict";

    angular.module("app", [
		/* Angular modules */
        "ngRoute",
		"ngAnimate",
		"ngSanitize",
		"ngAria",
		"ngMaterial",
        "ngStorage",
        "ngFileSaver", // angular-file-saver.bundle.min.js

		/* 3rd party modules */
		"oc.lazyLoad",
		"ui.bootstrap",
		"angular-loading-bar",
		"FBAngular",

		///* custom modules */
		"app.ctrls",
		"app.directives",
        "app.services",
		"app.ui.ctrls",
		"app.ui.directives",
        "app.book.ctrls",
        "app.demand.ctrls",
        "app.nav.ctrls",
        "app.login.ctrl",
        "app.signup.ctrl",
    ])
	.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.includeSpinner = true;
	    cfpLoadingBarProvider.latencyThreshold = 500;
	}])
    .constant('SERVER', {
        // if using local server
        url: 'http://localhost:54071/api/',
        clientId: 'DemoWebApp'
    })
    .config(["$routeProvider", "$locationProvider",  function ($routeProvider, $locationProvider) {
        var routes = [
			"pages/signin", "pages/signup", "pages/404"
        ];

        function setRoutes(route) {
            var url = '/' + route,
				config = {
				    templateUrl: "views/" + route + ".html",
				    authenticate: false
				};

            $routeProvider.when(url, config);
            return $routeProvider;
        }

        routes.forEach(function (route) {
            setRoutes(route);
        });

        $routeProvider
			.when("/", { redirectTo: "pages/signin" })
			.when("/404", { templateUrl: "views/pages/404.html" })
			.otherwise({ redirectTo: "/404" });

        $routeProvider.when("/books", {
            templateUrl: "views/book/list.html",
            authenticate: true
        });
        $routeProvider.when("/books/:oBookid", {
            templateUrl: "views/book/book.html",
            authenticate: true
        });
        $routeProvider.when("/demands", {
            templateUrl: "views/demand/demand.html",
            authenticate: true
        });
    }])
    .run(function ($rootScope, $location, AuthService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // Si el usuario no está autenticado, al comenzar el cambio de ruta, enviarlo a pantalla de login
            if (next.$$route.authenticate && !AuthService.isUserLoggedIn()) {
                $location.path('/signin');
            }
        })
    })
}())


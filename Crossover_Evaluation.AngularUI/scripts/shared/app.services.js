; (function () {
    "use strict";

    angular.module("app.services", [])

    .factory("DemandService", ['$http', '$q', 'SERVER', '$sessionStorage', function ($http, $q, SERVER, $sessionStorage) {
        var serviceBase = SERVER.url;
        var service = {};
        service.GetDemands = function () {
            var headers = Utils.Authorization.getBearerHeader($sessionStorage);
            var deferred = $q.defer();
            $http.get(serviceBase + 'demand/getown', { headers: headers }).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        return service;
    }])

    .factory("BookService", ['$http', '$q', 'SERVER', '$sessionStorage', function ($http, $q, SERVER, $sessionStorage) {
        var serviceBase = SERVER.url;
        var service = {};

        service.GetBooks = function () {
            var headers = Utils.Authorization.getBearerHeader($sessionStorage);
            var deferred = $q.defer();
            $http.get(serviceBase + 'book/get', { headers: headers }).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        service.GetBookById = function (id) {
            var headers = Utils.Authorization.getBearerHeader($sessionStorage);
            var deferred = $q.defer();
            $http.get(serviceBase + 'book/getbyid/' + id, { headers: headers }).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        return service;
    }])

    .factory('AuthService', ['$http', '$q', 'SERVER', '$location', '$window', 'AccountService', '$sessionStorage', function ($http, $q, SERVER, $location, $window, AccountService, $sessionStorage) {
        var serviceBase = SERVER.url;
        var authService = {};
        /** Autentica contra las credenciales dadas */
        authService.login = function (loginData) {
            var credentials = loginData;
            var data = 'grant_type=password&username=' + loginData.username + '&password=' + loginData.password;
            var request = {
                method: 'POST',
                url: serviceBase + 'oauth/token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                data: data
            };
            var deferred = $q.defer();
            $http(
                request
            ).success(function (response) {
                // Guardar los datos de autenticación en sesión
                // { access_token: string, token_type: string, expires_in: number }
                if (typeof response.token_type !== 'undefined' && response.token_type == 'bearer' && typeof response.access_token !== 'undefined') {
                    $sessionStorage.token = response; // Se guarda en la sesión en caso tal de que se requiera en algún caso especial
                    // Establecer el header predeterminado común de autorización para todas las llamadas al API
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.token.access_token;
                    //// Obtener datos de usuario
                    //AccountService.getUserByUsername(credentials.username).then(function (response) {
                    //    $sessionStorage.currentUser = response.data; // Almacenar el usuario actual en la sesión
                    //    // Redirección a dashboard
                    //    $location.path('/dashboard');
                    //}, function (err) {
                    //    console.log(err);
                    //});
                }
                deferred.resolve(true);
            }).error(function (err, status) {
                // Eliminar en caso tal que existe
                delete $sessionStorage.currentUser;
                // Eliminar el header default de autorización
                $http.defaults.headers.common.Authorization = '';
                deferred.reject(err);
            });
            return deferred.promise;
        };
        /** */
        authService.getCurrentUser = function () {
            return $sessionStorage.currentUser;
        };
        /** Indica si el usuario está logueado */
        authService.isUserLoggedIn = function () {
            if (typeof $sessionStorage.currentUser !== 'undefined' && typeof $sessionStorage.currentUser.userName !== 'undefined' &&
                $sessionStorage.currentUser.userName !== '') {
                return true;
            } else {
                return false;
            }
        };
        /** Elimina los datos de sesión */
        authService.logout = function () {
            $sessionStorage.$reset();
            // Eliminar el header default de autorización
            $http.defaults.headers.common.Authorization = ''; // Esto es medio buggy
            $location.path('/pages/signin');
            //$window.location.reload(); // Forzar la recarga de la página, para evitar un problema con Preflight CORS
        };
        return authService;
    }])

    .factory('AccountService', ['$http', '$q', 'SERVER', '$sessionStorage', function ($http, $q, SERVER, $sessionStorage) {
        var accountService = {};
        accountService.getUserByUsername = function (username) {
            var url = SERVER.url + 'account/user/' + username;
            var headers = Utils.Authorization.getBearerHeader($sessionStorage);
            return $http.get(url, { headers: headers }).then(function (response) { return response });
        };
        accountService.createUser = function (user) {
            var headers = Utils.Authorization.getBearerHeader($sessionStorage);
            headers['Content-Type'] = 'application/json';
            var request = {
                method: 'POST',
                url: SERVER.url + 'account/create',
                headers: headers,
                data: JSON.stringify(user)
            };
            var deferred = $q.defer();
            $http(request).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        return accountService;
    }])
}())
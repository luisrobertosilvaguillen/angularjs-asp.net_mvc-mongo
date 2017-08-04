; (function () {
    "use strict";

    angular.module('app.demand.ctrls', [])

	 .controller('DemandCtrl', ['$scope', 'DemandService', '$filter', function ($scope, DemandService, $filter) {
	     $scope.datas = []; // Almacena los resultados
	     $scope.filteredData = []; // Almacena los resultados filtrados
	     $scope.numPerPageOpts = [15, 25, 50, 100]; // Opciones de cantidad por página
	     $scope.numPerPage = $scope.numPerPageOpts[0]; // Cantidad por página inicial
	     $scope.currentPage = 1;
	     $scope.currentPageStores = []; // data to hold per pagination
	     $scope.searchKeywords = "";
	     $scope.row = "";

	     $scope.select = function (page) {
	         var start = (page - 1) * $scope.numPerPage,
                 end = start + $scope.numPerPage;
	         $scope.currentPageStores = $scope.filteredData.slice(start, end);
	     }

	     $scope.onFilterChange = function () {
	         $scope.select(1);
	         $scope.currentPage = 1;
	         $scope.row = '';
	     }

	     $scope.onNumPerPageChange = function () {
	         $scope.select(1);
	         $scope.currentPage = 1;
	     }

	     $scope.onOrderChange = function () {
	         $scope.select(1);
	         $scope.currentPage = 1;
	     }

	     $scope.search = function () {
	         $scope.filteredData = $filter("filter")($scope.datas, $scope.searchKeywords);
	         $scope.onFilterChange();
	     }

	     $scope.order = function (rowName) {
	         if ($scope.row == rowName)
	             return;
	         $scope.row = rowName;
	         $scope.filteredData = $filter('orderBy')($scope.datas, rowName);
	         $scope.onOrderChange();
	     }
	     // Función inicial para cargar datos
	     $scope.init = function () {
	         DemandService.GetDemands().then(function (response) {
	             $scope.datas = response;
	             $scope.search();
	             $scope.select($scope.currentPage);
	         },
             function (err) {
                 console.log(err);
             });
	     };
	     $scope.init();
	 }])
}())
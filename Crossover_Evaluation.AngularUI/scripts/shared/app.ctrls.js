;(function() {
"use strict";


angular.module("app.ctrls", [])

// Root Controller
.controller("AppCtrl", ["$rootScope", "$scope", "$interval", "$timeout", "$location", function ($rs, $scope, $interval, $timeout, $location) {
	var mm = window.matchMedia("(max-width: 767px)");
	$rs.isMobile = mm.matches ? true: false;

	$rs.safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};
	
	mm.addListener(function(m) {
		$rs.safeApply(function() {
			$rs.isMobile = (m.matches) ? true : false;
		});	
	});
	
	$scope.navFull = true;
	$scope.toggleNav = function() {
		$scope.navFull = $scope.navFull ? false : true;
		$rs.navOffCanvas = $rs.navOffCanvas ? false : true;
		console.log("navOffCanvas: " + $scope.navOffCanvas);

		$timeout(function() {
			$rs.$broadcast("c3.resize");
		}, 260);	// adjust this time according to nav transition
	};


	// ======= Site Settings
	$scope.toggleSettingsBox = function() {
		$scope.isSettingsOpen = $scope.isSettingsOpen ? false : true;
	};

	$scope.themeActive = "theme-zero";	// first theme
	
	$scope.fixedHeader = true;
	$scope.navHorizontal = false;	// this will access by other directive, so in rootScope.
	

	// === saving states
	var SETTINGS_STATES = "_setting-states";
	var statesQuery = {
		get : function() {
			return JSON.parse(localStorage.getItem(SETTINGS_STATES));
		},
		put : function(states) {
			localStorage.setItem(SETTINGS_STATES, JSON.stringify(states));
		}
	};

	// initialize the states
	var sQuery = statesQuery.get() || {
		navHorizontal: $scope.navHorizontal,
		fixedHeader: $scope.fixedHeader,
		navFull: $scope.navFull,
		themeActive: $scope.themeActive
	};

	// console.log(savedStates);
	if(sQuery) {
		$scope.navHorizontal = sQuery.navHorizontal;
		$scope.fixedHeader = sQuery.fixedHeader;
		$scope.navFull = sQuery.navFull;
		$scope.themeActive = sQuery.themeActive;
	}

	// putting the states
	$scope.onNavHorizontal = function() {
		sQuery.navHorizontal = $scope.navHorizontal;
		statesQuery.put(sQuery);
	};

	$scope.onNavFull = function() {
		sQuery.navFull = $scope.navFull;
		statesQuery.put(sQuery);

		$timeout(function() {
			$rs.$broadcast("c3.resize");
		}, 260);	
		
	};

	$scope.onFixedHeader = function() {
		sQuery.fixedHeader = $scope.fixedHeader;
		statesQuery.put(sQuery);
	};

	$scope.onThemeActive = function() {
		sQuery.themeActive = $scope.themeActive;
		statesQuery.put(sQuery);
	};

	$scope.onThemeChange = function(theme) {
		$scope.themeActive = theme;
		$scope.onThemeActive();
	};

	$scope.go = function (path) {
	    $location.path(path);
	};

    // Añadir notificaciones en el controlador raíz
	$scope.toasts = [];
    // Lugar donde se va a desplegar la notificación
	// topLeft, topRight, bottomLeft, bottomRight, se configura en index.html
    // Para mostrar notificación, utilizar $rootScope.$broadcast('AppCtrl:toast', args)
	$scope.$on('AppCtrl:toast', function (event, args) {
	    if (typeof args.anim !== 'undefined' && typeof args.type !== 'undefined' && typeof args.msg !== 'undefiend') {
	        $scope.toasts.push({
	            anim: args.anim,
	            type: args.type,
	            msg: args.msg
	        });
	        // Setear timeout para eliminar notificaciones de forma automática
	        var delay = 5000;
	        if (typeof args.delay !== 'undefined') // Si delay está especificado, se utiliza ese delay
	            delay = args.delay;
	        setTimeout(function () {
	            if ($scope.toasts.length > 0)
	                $scope.toasts.splice(0, 1);
	        }, delay); // 5 segundos
	    }
	});

	$scope.closeAlert = function (index) {
	    $scope.toasts.splice(index, 1);
	}

    // Animación de progreso o carga. loader.min.css
	$scope.$on('AppCtrl:loader', function (event, args) {
	    if (args.show) {
	        $('#loader').css('visibility', 'visible');
	    } else {
	        $('#loader').css('visibility', 'hidden');
	    }
	});
}])

.controller("HeadCtrl", ["$scope", "Fullscreen", function($scope, Fullscreen) {
	$scope.toggleFloatingSidebar = function() {
		$scope.floatingSidebar = $scope.floatingSidebar ? false : true;
		console.log("floating-sidebar: " + $scope.floatingSidebar);
	};

	$scope.goFullScreen = function() {
		if (Fullscreen.isEnabled())
        	Fullscreen.cancel();
      	else
         	Fullscreen.all()
	};

	
}])



// #end
})()
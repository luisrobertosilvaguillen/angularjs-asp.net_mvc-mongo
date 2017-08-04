;(function() {
"use strict";

angular.module("app.ui.ctrls", [])


// Toast Demo Ctrl
.controller("ToastDemoCtrl", ["$scope", "$interval",  function($scope, $timeout) {
	// selection
	// We are not lazy-loading this controller because the controller for <ui-select> plugin used with this is also interact 
	// with other variables. 
	$scope.noti = {selected: "Success"};
	$scope.notifications = ["Warning", "Success", "Info", "Danger"]

	// Radio Models
	$scope.positionModel = "topRight";
	$scope.animModel = "scale";


	var MSGS = [
			"<strong>Error:</strong> Try submitting content again.",
			"a toast message...",
			"another toast message...",
			"<strong>Title:</strong> Toast message with <a href='#na' class='alert-link'>link</a>",
			"Hye, angry wars happening inside red doors."
		],
		cntr = 0;

	$scope.toasts = [
		// {
		// 	anim: $scope.animModel,
		// 	type: angular.lowercase($scope.noti.selected), 
		// 	msg: "a toast message..."
		// }
	];
	$scope.closeAlert = function(index) {
		$scope.toasts.splice(index, 1);
	}
	$scope.createToast = function() {
		$scope.toasts.push({
			anim: $scope.animModel,
			type: angular.lowercase($scope.noti.selected),
			msg: MSGS[cntr]
		});
		cntr++;
		if(cntr > 4) cntr = 0;	// reset it
	}

}])


// Alert Demo Ctrl
.controller('AlertDemoCtrl', ["$scope", function ($scope) {
	$scope.alerts = [
		{ type: 'warning', msg: '<strong>Warning:</strong> Backup all your drive.' },
		{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
		{ type: 'success', msg: 'Well done! You successfully read this important alert message.' },
		{ type: 'info', msg: '<strong>Info:</strong> You have got mail.' },
	];

	$scope.addAlert = function() {
		var randAlertMsg = Math.floor(Math.random()*4),
			randAlertType = Math.floor(Math.random()*4);
		$scope.alerts.push({type: $scope.alerts[randAlertType].type, msg: $scope.alerts[randAlertMsg].msg});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
}])


// Icon demo ctrl
.controller("IconDemoCtrl", ["$scope", "$filter",  function($scope, $filter) {
	$scope.icons = [
		"ion-ionic",  "ion-arrow-up-a",  "ion-arrow-right-a",  "ion-arrow-down-a",  "ion-arrow-left-a",  "ion-arrow-up-b",  "ion-arrow-right-b",  "ion-arrow-down-b",  "ion-arrow-left-b",  "ion-arrow-up-c",  "ion-arrow-right-c",  "ion-arrow-down-c",  "ion-arrow-left-c",  "ion-arrow-return-right",  "ion-arrow-return-left",  "ion-arrow-swap",  "ion-arrow-shrink",  "ion-arrow-expand",  "ion-arrow-move",  "ion-arrow-resize",  "ion-chevron-up",  "ion-chevron-right",  "ion-chevron-down",  "ion-chevron-left",  "ion-navicon-round",  "ion-navicon",  "ion-drag",  "ion-log-in",  "ion-log-out",  "ion-checkmark-round",  "ion-checkmark",  "ion-checkmark-circled",  "ion-close-round",  "ion-close",  "ion-close-circled",  "ion-plus-round",  "ion-plus",  "ion-plus-circled",  "ion-minus-round",  "ion-minus",  "ion-minus-circled",  "ion-information",  "ion-information-circled",  "ion-help",  "ion-help-circled",  "ion-backspace-outline",  "ion-backspace",  "ion-help-buoy",  "ion-asterisk",  "ion-alert",  "ion-alert-circled",  "ion-refresh",  "ion-loop",  "ion-shuffle",  "ion-home",  "ion-search",  "ion-flag",  "ion-star",  "ion-heart",  "ion-heart-broken",  "ion-gear-a",  "ion-gear-b",  "ion-toggle-filled",  "ion-toggle",  "ion-settings",  "ion-wrench",  "ion-hammer",  "ion-edit",  "ion-trash-a",  "ion-trash-b",  "ion-document",  "ion-document-text",  "ion-clipboard",  "ion-scissors",  "ion-funnel",  "ion-bookmark",  "ion-email",  "ion-email-unread",  "ion-folder",  "ion-filing",  "ion-archive",  "ion-reply",  "ion-reply-all",  "ion-forward",  "ion-share",  "ion-paper-airplane",  "ion-link",  "ion-paperclip",  "ion-compose",  "ion-briefcase",  "ion-medkit",  "ion-at",  "ion-pound",  "ion-quote",  "ion-cloud",  "ion-upload",  "ion-more",  "ion-grid",  "ion-calendar",  "ion-clock",  "ion-compass",  "ion-pinpoint",  "ion-pin",  "ion-navigate",  "ion-location",  "ion-map",  "ion-lock-combination",  "ion-locked",  "ion-unlocked",  "ion-key",  "ion-arrow-graph-up-right",  "ion-arrow-graph-down-right",  "ion-arrow-graph-up-left",  "ion-arrow-graph-down-left",  "ion-stats-bars",  "ion-connection-bars",  "ion-pie-graph",  "ion-chatbubble",  "ion-chatbubble-working",  "ion-chatbubbles",  "ion-chatbox",  "ion-chatbox-working",  "ion-chatboxes",  "ion-person",  "ion-person-add",  "ion-person-stalker",  "ion-woman",  "ion-man",  "ion-female",  "ion-male",  "ion-transgender",  "ion-fork",  "ion-knife",  "ion-spoon",  "ion-soup-can-outline",  "ion-soup-can",  "ion-beer",  "ion-wineglass",  "ion-coffee",  "ion-icecream",  "ion-pizza",  "ion-power",  "ion-mouse",  "ion-battery-full",  "ion-battery-half",  "ion-battery-low",  "ion-battery-empty",  "ion-battery-charging",  "ion-wifi",  "ion-bluetooth",  "ion-calculator",  "ion-camera",  "ion-eye",  "ion-eye-disabled",  "ion-flash",  "ion-flash-off",  "ion-qr-scanner",  "ion-image",  "ion-images",  "ion-wand",  "ion-contrast",  "ion-aperture",  "ion-crop",  "ion-easel",  "ion-paintbrush",  "ion-paintbucket",  "ion-monitor",  "ion-laptop",  "ion-ipad",  "ion-iphone",  "ion-ipod",  "ion-printer",  "ion-usb",  "ion-outlet",  "ion-bug",  "ion-code",  "ion-code-working",  "ion-code-download",  "ion-fork-repo",  "ion-network",  "ion-pull-request",  "ion-merge",  "ion-xbox",  "ion-playstation",  "ion-steam",  "ion-closed-captioning",  "ion-videocamera",  "ion-film-marker",  "ion-disc",  "ion-headphone",  "ion-music-note",  "ion-radio-waves",  "ion-speakerphone",  "ion-mic-a",  "ion-mic-b",  "ion-mic-c",  "ion-volume-high",  "ion-volume-medium",  "ion-volume-low",  "ion-volume-mute",  "ion-levels",  "ion-play",  "ion-pause",  "ion-stop",  "ion-record",  "ion-skip-forward",  "ion-skip-backward",  "ion-eject",  "ion-bag",  "ion-card",  "ion-cash",  "ion-pricetag",  "ion-pricetags",  "ion-thumbsup",  "ion-thumbsdown",  "ion-happy-outline",  "ion-happy",  "ion-sad-outline",  "ion-sad",  "ion-bowtie",  "ion-tshirt-outline",  "ion-tshirt",  "ion-trophy",  "ion-podium",  "ion-ribbon-a",  "ion-ribbon-b",  "ion-university",  "ion-magnet",  "ion-beaker",  "ion-erlenmeyer-flask",  "ion-egg",  "ion-earth",  "ion-planet",  "ion-lightbulb",  "ion-cube",  "ion-leaf",  "ion-waterdrop",  "ion-flame",  "ion-fireball",  "ion-bonfire",  "ion-umbrella",  "ion-nuclear",  "ion-no-smoking",  "ion-thermometer",  "ion-speedometer",  "ion-model-s",  "ion-plane",  "ion-jet",  "ion-load-a",  "ion-load-b",  "ion-load-c",  "ion-load-d",
		"ion-ios-ionic-outline", "ion-ios-arrow-back", "ion-ios-arrow-forward", "ion-ios-arrow-up", "ion-ios-arrow-right", "ion-ios-arrow-down", "ion-ios-arrow-left", "ion-ios-arrow-thin-up", "ion-ios-arrow-thin-right", "ion-ios-arrow-thin-down", "ion-ios-arrow-thin-left", "ion-ios-circle-filled", "ion-ios-circle-outline", "ion-ios-checkmark-empty", "ion-ios-checkmark-outline", "ion-ios-checkmark", "ion-ios-plus-empty", "ion-ios-plus-outline", "ion-ios-plus", "ion-ios-close-empty", "ion-ios-close-outline", "ion-ios-close", "ion-ios-minus-empty", "ion-ios-minus-outline", "ion-ios-minus", "ion-ios-information-empty", "ion-ios-information-outline", "ion-ios-information", "ion-ios-help-empty", "ion-ios-help-outline", "ion-ios-help", "ion-ios-search", "ion-ios-search-strong", "ion-ios-star", "ion-ios-star-half", "ion-ios-star-outline", "ion-ios-heart", "ion-ios-heart-outline", "ion-ios-more", "ion-ios-more-outline", "ion-ios-home", "ion-ios-home-outline", "ion-ios-cloud", "ion-ios-cloud-outline", "ion-ios-cloud-upload", "ion-ios-cloud-upload-outline", "ion-ios-cloud-download", "ion-ios-cloud-download-outline", "ion-ios-upload", "ion-ios-upload-outline", "ion-ios-download", "ion-ios-download-outline", "ion-ios-refresh", "ion-ios-refresh-outline", "ion-ios-refresh-empty", "ion-ios-reload", "ion-ios-loop-strong", "ion-ios-loop", "ion-ios-bookmarks", "ion-ios-bookmarks-outline", "ion-ios-book", "ion-ios-book-outline", "ion-ios-flag", "ion-ios-flag-outline", "ion-ios-glasses", "ion-ios-glasses-outline", "ion-ios-browsers", "ion-ios-browsers-outline", "ion-ios-at", "ion-ios-at-outline", "ion-ios-pricetag", "ion-ios-pricetag-outline", "ion-ios-pricetags", "ion-ios-pricetags-outline", "ion-ios-cart", "ion-ios-cart-outline", "ion-ios-chatboxes", "ion-ios-chatboxes-outline", "ion-ios-chatbubble", "ion-ios-chatbubble-outline", "ion-ios-cog", "ion-ios-cog-outline", "ion-ios-gear", "ion-ios-gear-outline", "ion-ios-settings", "ion-ios-settings-strong", "ion-ios-toggle", "ion-ios-toggle-outline", "ion-ios-analytics", "ion-ios-analytics-outline", "ion-ios-pie", "ion-ios-pie-outline", "ion-ios-pulse", "ion-ios-pulse-strong", "ion-ios-filing", "ion-ios-filing-outline", "ion-ios-box", "ion-ios-box-outline", "ion-ios-compose", "ion-ios-compose-outline", "ion-ios-trash", "ion-ios-trash-outline", "ion-ios-copy", "ion-ios-copy-outline", "ion-ios-email", "ion-ios-email-outline", "ion-ios-undo", "ion-ios-undo-outline", "ion-ios-redo", "ion-ios-redo-outline", "ion-ios-paperplane", "ion-ios-paperplane-outline", "ion-ios-folder", "ion-ios-folder-outline", "ion-ios-paper", "ion-ios-paper-outline", "ion-ios-list", "ion-ios-list-outline", "ion-ios-world", "ion-ios-world-outline", "ion-ios-alarm", "ion-ios-alarm-outline", "ion-ios-speedometer", "ion-ios-speedometer-outline", "ion-ios-stopwatch", "ion-ios-stopwatch-outline", "ion-ios-timer", "ion-ios-timer-outline", "ion-ios-clock", "ion-ios-clock-outline", "ion-ios-time", "ion-ios-time-outline", "ion-ios-calendar", "ion-ios-calendar-outline", "ion-ios-photos", "ion-ios-photos-outline", "ion-ios-albums", "ion-ios-albums-outline", "ion-ios-camera", "ion-ios-camera-outline", "ion-ios-reverse-camera", "ion-ios-reverse-camera-outline", "ion-ios-eye", "ion-ios-eye-outline", "ion-ios-bolt", "ion-ios-bolt-outline", "ion-ios-color-wand", "ion-ios-color-wand-outline", "ion-ios-color-filter", "ion-ios-color-filter-outline", "ion-ios-grid-view", "ion-ios-grid-view-outline", "ion-ios-crop-strong", "ion-ios-crop", "ion-ios-barcode", "ion-ios-barcode-outline", "ion-ios-briefcase", "ion-ios-briefcase-outline", "ion-ios-medkit", "ion-ios-medkit-outline", "ion-ios-medical", "ion-ios-medical-outline", "ion-ios-infinite", "ion-ios-infinite-outline", "ion-ios-calculator", "ion-ios-calculator-outline", "ion-ios-keypad", "ion-ios-keypad-outline", "ion-ios-telephone", "ion-ios-telephone-outline", "ion-ios-drag", "ion-ios-location", "ion-ios-location-outline", "ion-ios-navigate", "ion-ios-navigate-outline", "ion-ios-locked", "ion-ios-locked-outline", "ion-ios-unlocked", "ion-ios-unlocked-outline", "ion-ios-monitor", "ion-ios-monitor-outline", "ion-ios-printer", "ion-ios-printer-outline", "ion-ios-game-controller-a", "ion-ios-game-controller-a-outline", "ion-ios-game-controller-b", "ion-ios-game-controller-b-outline", "ion-ios-americanfootball", "ion-ios-americanfootball-outline", "ion-ios-baseball", "ion-ios-baseball-outline", "ion-ios-basketball", "ion-ios-basketball-outline", "ion-ios-tennisball", "ion-ios-tennisball-outline", "ion-ios-football", "ion-ios-football-outline", "ion-ios-body", "ion-ios-body-outline", "ion-ios-person", "ion-ios-person-outline", "ion-ios-personadd", "ion-ios-personadd-outline", "ion-ios-people", "ion-ios-people-outline", "ion-ios-musical-notes", "ion-ios-musical-note", "ion-ios-bell", "ion-ios-bell-outline", "ion-ios-mic", "ion-ios-mic-outline", "ion-ios-mic-off", "ion-ios-volume-high", "ion-ios-volume-low", "ion-ios-play", "ion-ios-play-outline", "ion-ios-pause", "ion-ios-pause-outline", "ion-ios-recording", "ion-ios-recording-outline", "ion-ios-fastforward", "ion-ios-fastforward-outline", "ion-ios-rewind", "ion-ios-rewind-outline", "ion-ios-skipbackward", "ion-ios-skipbackward-outline", "ion-ios-skipforward", "ion-ios-skipforward-outline", "ion-ios-shuffle-strong", "ion-ios-shuffle", "ion-ios-videocam", "ion-ios-videocam-outline", "ion-ios-film", "ion-ios-film-outline", "ion-ios-flask", "ion-ios-flask-outline", "ion-ios-lightbulb", "ion-ios-lightbulb-outline", "ion-ios-wineglass", "ion-ios-wineglass-outline", "ion-ios-pint", "ion-ios-pint-outline", "ion-ios-nutrition", "ion-ios-nutrition-outline", "ion-ios-flower", "ion-ios-flower-outline", "ion-ios-rose", "ion-ios-rose-outline", "ion-ios-paw", "ion-ios-paw-outline", "ion-ios-flame", "ion-ios-flame-outline", "ion-ios-sunny", "ion-ios-sunny-outline", "ion-ios-partlysunny", "ion-ios-partlysunny-outline", "ion-ios-cloudy", "ion-ios-cloudy-outline", "ion-ios-rainy", "ion-ios-rainy-outline", "ion-ios-thunderstorm", "ion-ios-thunderstorm-outline", "ion-ios-snowy", "ion-ios-moon", "ion-ios-moon-outline", "ion-ios-cloudy-night", "ion-ios-cloudy-night-outline",
		"ion-android-arrow-up", "ion-android-arrow-forward", "ion-android-arrow-down", "ion-android-arrow-back", "ion-android-arrow-dropup", "ion-android-arrow-dropup-circle", "ion-android-arrow-dropright", "ion-android-arrow-dropright-circle", "ion-android-arrow-dropdown", "ion-android-arrow-dropdown-circle", "ion-android-arrow-dropleft", "ion-android-arrow-dropleft-circle", "ion-android-add", "ion-android-add-circle", "ion-android-remove", "ion-android-remove-circle", "ion-android-close", "ion-android-cancel", "ion-android-radio-button-off", "ion-android-radio-button-on", "ion-android-checkmark-circle", "ion-android-checkbox-outline-blank", "ion-android-checkbox-outline", "ion-android-checkbox-blank", "ion-android-checkbox", "ion-android-done", "ion-android-done-all", "ion-android-menu", "ion-android-more-horizontal", "ion-android-more-vertical", "ion-android-refresh", "ion-android-sync", "ion-android-wifi", "ion-android-call", "ion-android-apps", "ion-android-settings", "ion-android-options", "ion-android-funnel", "ion-android-search", "ion-android-home", "ion-android-cloud-outline", "ion-android-cloud", "ion-android-download", "ion-android-upload", "ion-android-cloud-done", "ion-android-cloud-circle", "ion-android-favorite-outline", "ion-android-favorite", "ion-android-star-outline", "ion-android-star-half", "ion-android-star", "ion-android-calendar", "ion-android-alarm-clock", "ion-android-time", "ion-android-stopwatch", "ion-android-watch", "ion-android-locate", "ion-android-navigate", "ion-android-pin", "ion-android-compass", "ion-android-map", "ion-android-walk", "ion-android-bicycle", "ion-android-car", "ion-android-bus", "ion-android-subway", "ion-android-train", "ion-android-boat", "ion-android-plane", "ion-android-restaurant", "ion-android-bar", "ion-android-cart", "ion-android-camera", "ion-android-image", "ion-android-film", "ion-android-color-palette", "ion-android-create", "ion-android-mail", "ion-android-drafts", "ion-android-send", "ion-android-archive", "ion-android-delete", "ion-android-attach", "ion-android-share", "ion-android-share-alt", "ion-android-bookmark", "ion-android-document", "ion-android-clipboard", "ion-android-list", "ion-android-folder-open", "ion-android-folder", "ion-android-print", "ion-android-open", "ion-android-exit", "ion-android-contract", "ion-android-expand", "ion-android-globe", "ion-android-chat", "ion-android-textsms", "ion-android-hangout", "ion-android-happy", "ion-android-sad", "ion-android-person", "ion-android-people", "ion-android-person-add", "ion-android-contact", "ion-android-contacts", "ion-android-playstore", "ion-android-lock", "ion-android-unlock", "ion-android-microphone", "ion-android-microphone-off", "ion-android-notifications-none", "ion-android-notifications", "ion-android-notifications-off", "ion-android-volume-mute", "ion-android-volume-down", "ion-android-volume-up", "ion-android-volume-off", "ion-android-hand", "ion-android-desktop", "ion-android-laptop", "ion-android-phone-portrait", "ion-android-phone-landscape", "ion-android-bulb", "ion-android-sunny", "ion-android-alert", "ion-android-warning", 
		"ion-social-twitter", "ion-social-twitter-outline", "ion-social-facebook", "ion-social-facebook-outline", "ion-social-googleplus", "ion-social-googleplus-outline", "ion-social-google", "ion-social-google-outline", "ion-social-dribbble", "ion-social-dribbble-outline", "ion-social-octocat", "ion-social-github", "ion-social-github-outline", "ion-social-instagram", "ion-social-instagram-outline", "ion-social-whatsapp", "ion-social-whatsapp-outline", "ion-social-snapchat", "ion-social-snapchat-outline", "ion-social-foursquare", "ion-social-foursquare-outline", "ion-social-pinterest", "ion-social-pinterest-outline", "ion-social-rss", "ion-social-rss-outline", "ion-social-tumblr", "ion-social-tumblr-outline", "ion-social-wordpress", "ion-social-wordpress-outline", "ion-social-reddit", "ion-social-reddit-outline", "ion-social-hackernews", "ion-social-hackernews-outline", "ion-social-designernews", "ion-social-designernews-outline", "ion-social-yahoo", "ion-social-yahoo-outline", "ion-social-buffer", "ion-social-buffer-outline", "ion-social-skype", "ion-social-skype-outline", "ion-social-linkedin", "ion-social-linkedin-outline", "ion-social-vimeo", "ion-social-vimeo-outline", "ion-social-twitch", "ion-social-twitch-outline", "ion-social-youtube", "ion-social-youtube-outline", "ion-social-dropbox", "ion-social-dropbox-outline", "ion-social-apple", "ion-social-apple-outline", "ion-social-android", "ion-social-android-outline", "ion-social-windows", "ion-social-windows-outline", "ion-social-html5", "ion-social-html5-outline", "ion-social-css3", "ion-social-css3-outline", "ion-social-javascript", "ion-social-javascript-outline", "ion-social-angular", "ion-social-angular-outline", "ion-social-nodejs", "ion-social-sass", "ion-social-python", "ion-social-chrome", "ion-social-chrome-outline", "ion-social-codepen", "ion-social-codepen-outline", "ion-social-markdown", "ion-social-tux", "ion-social-freebsd-devil", "ion-social-usd", "ion-social-usd-outline", "ion-social-bitcoin", "ion-social-bitcoin-outline", "ion-social-yen", "ion-social-yen-outline", "ion-social-euro", "ion-social-euro-outline", 
	];

	$scope.iconKeywords = "";
	$scope.filteredIcons = [];

	$scope.iconSearch = function() {
		$scope.filteredIcons = $filter("filter")($scope.icons, $scope.iconKeywords);
	};
	$scope.iconSearch();

}])


/// Modal Demo Ctrl
.controller("ModalDemoCtrl", ["$scope", "$modal", function($scope, $modal) {

	$scope.modalAnim = "default";

	$scope.modalOpen = function() {
		$modal.open({
			templateUrl: "views/ui/modalContent.html",
			size: "md",
			controller: "ModalDemoCtrl",
			resolve: function() {},
			windowClass: $scope.modalAnim	// Animation Class put here.
		});
		
	}

	$scope.modalClose = function() {
		$scope.$close();	// this method is associated with $modal scope which is this.
	}

}])


/// Progress Demo Ctrl
.controller("ProgressDemoCtrl", ["$scope", function($scope) {
	$scope.stacked = [
		{ type: 'primary', value: 20 },
		{ type: 'success', value: 15 },
		{ type: 'info', value: 20 },
		{ type: 'warning', value: 30 },
		{ type: 'danger', value: 15 }
	];

}])


/// Tooltip Demo Ctrl
.controller("TooltipDemoCtrl", ["$scope", function($scope) {
	$scope.dynamicTooltip = "Hello, World!";
	$scope.tooltipHtml = "Hey!, I am <b>bold</b>.";

}])


// pagination demo ctrl
.controller('PaginationDemoCtrl', ["$scope", function ($scope) {
	$scope.totalItems = 64;
	$scope.currentPage = 4;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
}])



// ratings demo ctrl
.controller('RatingsDemoCtrl', ["$scope", function ($scope) {
	$scope.rate = 7;
	$scope.max = 10;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

}])


// Typeahead Demo Ctrl
.controller("TypeaheadDemoCtrl", ["$scope", function($scope) {
	$scope.selected = undefined;
  	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
	  	'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
	  	'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
	  	'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
	  	'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];
}])


// Datepicker Demo Ctrl
.controller("DatepickerDemoCtrl", ["$scope", function($scope) {
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};
	$scope.dt = Date.now();
	$scope.format = 'yyyy-MM-dd';
}])






// end
}())
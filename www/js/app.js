(function() {
  'use strict';

  var dependencies = [
    'ionic',
    'app.contacts'
  ];

  angular
    .module('app', dependencies)
    .run(run)
    .config(logConfig);

    run.$inject = ['$ionicPlatform'];
    function run($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }

    logConfig.$inject = ['$logProvider'];
    function logConfig($logProvider) {
      $logProvider.debugEnabled(false);
    }
})();

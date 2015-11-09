(function() {
  'use strict';

  var dependencies = [
    'ionic',
    'pascalprecht.translate',
    'jett.ionic.filter.bar'
  ];

  angular
    .module('app.contacts', dependencies)
    .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routerConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('contacts', {
          url: '/contacts',
          templateUrl: 'modules/contacts/contacts.html',
          controller: 'contactsCtrl',
          controllerAs: 'viewModel',
        })

      $urlRouterProvider.otherwise('/contacts');
    }
})();

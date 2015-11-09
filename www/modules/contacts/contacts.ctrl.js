(function() {
  'use strict';

  angular
    .module('app.contacts')
    .controller('contactsCtrl', contactsCtrl);

  contactsCtrl.$inject = ['$scope', '$ionicPlatform', '$log', 'contactsService', '$ionicModal', '$ionicFilterBar', '$q', '$filter'];
  function contactsCtrl($scope, $ionicPlatform, $log, contactsService, $ionicModal, $ionicFilterBar, $q, $filter) {
    /////////////////////////
    // variable
    /////////////////////////
    var filterBarInstance;
    var viewModel = this;

    viewModel.listContacts = [];
    viewModel.openAddContactModal = undefined;
    /////////////////////////
    // methods
    /////////////////////////
    viewModel.addContact = addContact;
    viewModel.openAddContactModal = openAddContactModal;
    viewModel.closeAddContactModal = closeAddContactModal;
    viewModel.showFilterBar = showFilterBar;
    /////////////////////////
    // initialize
    /////////////////////////
    initialize();
    /////////////////////////
    // functions
    /////////////////////////
    function initialize() {
      $log.info('initialize contactsCtrl');
      // load contacts from mobile
      return findContacts();
    }

    function findContacts() {
      $log.info('get contacts');
      contactsService.findContacts().then(function(listContacts) {
        viewModel.listContacts = listContacts;
      });
    }

    function addContact() {
      $log.info('addContact');
      contactsService.add(viewModel.newContact.displayName, viewModel.newContact.mobilePhone).then(function(contact) {
        viewModel.listContacts = contactsService.getContacts();
        closeAddContactModal();
      });
    }

    function openAddContactModal() {
      $log.info('openAddContactModal');
      if (viewModel.addContactModal) {
        viewModel.addContactModal.show();
      } else {
        $ionicModal.fromTemplateUrl('modules/contacts/templates/modal-contact-add.html', {
          scope: $scope,
        }).then(function(modal) {
          viewModel.addContactModal = modal;
          viewModel.addContactModal.show();
          viewModel.unregisterBackButton = $ionicPlatform.registerBackButtonAction(registerBackButton, 500);
        });
      }
    }

    function closeAddContactModal() {
      $log.info('closeAddContactModal');
      viewModel.newContact.displayName = '';
      viewModel.newContact.mobilePhone = '';
      viewModel.addContactModal.hide();
    }

    function registerBackButton() {
      closeAddContactModal();
      if (viewModel.unregisterBackButton){
        viewModel.unregisterBackButton();
      }
    }

    function showFilterBar() {
      filterBarInstance = $ionicFilterBar.show({
        items: viewModel.listContacts,
        update: function (filteredItems, filterText) {
          viewModel.listContacts  = filteredItems;
        },
        expression: function (filterText, value, index, array) {
          var szText = angular.lowercase(filterText);
          if ((value.displayName && angular.lowercase(value.displayName).indexOf(szText) > -1)
            || (value.nickname && angular.lowercase(value.nickname).indexOf(szText) > -1)
            || (value.mobilePhone && angular.lowercase(value.mobilePhone).indexOf(szText) > -1)) {
            return true;;
          } else {
            return false;
          }
        }
      });
    };
  }
})();


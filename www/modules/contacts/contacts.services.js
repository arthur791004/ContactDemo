(function() {
  'use strict';

  angular
    .module('app.contacts')
    .factory('contactsService', contactsService);

  contactsService.$inject = ['$q', '$log', '$filter', '$ionicPlatform', 'CONST_CONTACTS'];
  function contactsService($q, $log, $filter, $ionicPlatform, CONST_CONTACTS) {
    /////////////////////////
    // variable
    /////////////////////////
    var listContacts = [];
    /////////////////////////
    // services
    /////////////////////////
    var services = {
      add: add,
      findContacts: findContacts,
      getContacts: getContacts
    };
    return services;
    ////////////////////
    // functions
    ////////////////////
    function add(szName, szPhone) {
      $log.info('contactsService.add', szName, szPhone);
      var deferred = $q.defer();

      $ionicPlatform.ready(function() {
        if (!angular.isDefined(navigator.contacts)) {
          return deferred.reject('navigator.contacts is undefined');
        }

        var contact = navigator.contacts.create();
        var phoneNumbers = [];

        phoneNumbers.push(new ContactField('mobile', szPhone, true));
        // specify both to support all devices
        contact.displayName = szName;
        contact.nickname = szName;
        contact.phoneNumbers = phoneNumbers;
        contact.save(
          function(contact) {
            $log.info('navigator.contacts.save success', contact);
            insertContact(contact);
            deferred.resolve(contact);
          },
          function(err) {
            $log.error('navigator.contacts.save failed', err);
            deferred.reject(err);
          });
      });

      return deferred.promise;
    }

    function findContacts() {
      $log.info('contactsService.findContacts');
      var deferred = $q.defer();

      listContacts = [];
      $ionicPlatform.ready(function() {
        if (!angular.isDefined(navigator.contacts)) {
          return deferred.reject('navigator.contacts is undefined');
        }

        var fields = [
          navigator.contacts.fieldType.displayName,
          navigator.contacts.fieldType.nickname,
          navigator.contacts.fieldType.phoneNumbers
        ];
        navigator.contacts.find(
          fields,
          function(contacts) {
            $log.info('navigator.contacts.find success', contacts);
            angular.forEach(contacts, function(contact) {
              if (contact.phoneNumbers === null) {
                return;
              }
              insertContact(contact);
            });
            deferred.resolve(listContacts);
          }, 
          function(err) {
            $log.error('navigator.contacts.find failed', err);
            deferred.reject(err);
          });
      });

      return deferred.promise;
    }

    function getContacts() {
      $log.info('contactsService.getContacts');
      return listContacts;
    }

    function insertContact(contact) {
      $log.info('contactsService.insertContact');
      var filter = {
        type: 'mobile'
      };
      contact.mobilePhone = $filter('filter')(contact.phoneNumbers, filter)[0].value;
      contact.avatar = (contact.photos) ? contact.photos[0].value : CONST_CONTACTS.IMG_DEFAULT_AVATAR;
      listContacts.push(contact);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .config(translateCht)
    .config(languageConfig);
    
  function languageConfig($translateProvider) {
    // Set default language
    $translateProvider.preferredLanguage('cht');
  }
})();

angular.module('timelineApp', [
  'ngMaterial',
  'timelineApp.controllers',
  'timelineApp.services',
  'timelineApp.directives'
]).config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default');
  //.primaryPalette('blue')
  //.accentPalette('light-blue')
  //.warnPalette('orange')
  //.backgroundPalette('red');
}]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['timelineApp']);
  document.body.style.cssText = '';
});


angular.module('Sfotipy', [
  'ngRoute',
  'Sfotipy.controllers'
]).config([ '$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', { controller: 'AppController' });
  $routeProvider.otherwise({ redirectTo: '/' });
}]);

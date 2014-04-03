angular.module('Sfotipy.controllers', [])
  .controller('AppController', ['$scope', '$rootScope', '$http',
    function ($scope, $rootScope, $http) {
      $http.get('/data.json').success(function (data) {
        $rootScope.albums = [];
        $rootScope.currentAlbum = {};
        $rootScope.currentSong = {};

        for (var name in data) {
          if (data.hasOwnProperty(name)) {
            var album = data[name];
            album.name = name;
            $rootScope.albums.push(album);
          }
        }
      });

      $scope.select = function (albumName) {
        var album = _.where($rootScope.albums, { name: albumName });
        if (album.length > 0) {
          $rootScope.currentAlbum = album[0];
        }
      }

      $scope.add = function (songName) {
        var song = _.where($rootScope.currentAlbum.songs, { name: songName });
        if (song.length > 0) {
          $rootScope.currentSong = song[0];
        }
      }
    }
  ]);

var Backbone      = require('backbone'),
    Albums        = require('../collections/albums'),
    Songs         = require('../collections/songs'),
    Album         = require('../models/album'),
    Song          = require('../models/song'),
    PlaylistView  = require('../views/list'),
    PlayerView    = require('../views/player'),
    AlbumsView    = require('../views/albums'),
    $             = require('jquery');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "album/:name": "album"
  },

  initialize: function () {
    this.current = {};
    this.jsonData = {};
    this.albums = new Albums();
    this.songs = new Songs();
    this.playlist = new PlaylistView({ collection: this.songs });
    this.player = new PlayerView({ model: new Song() });
    this.albumlist = new AlbumsView({ collection: this.albums });

    Backbone.history.start();
  },

  index: function () {
    this.fetchData();
  },

  album: function (name) {
    if (Object.keys(this.jsonData).length === 0) {
      var self = this;

      this.fetchData().done(function () {
        self.addSongs(name);
      });

    } else {
      this.addSongs(name);
    }
  },

  fetchData: function () {
    var self = this;

    // Load Data
    return $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          self.addAlbum(name, data[name]);
        }
      }

    });
  },

  addSongs: function (name) {
    this.songs.reset();

    this.current.album = this.jsonData[name];
    this.current.album.songs.forEach(this.addSong, this);
  },

  addSong: function (song) {
    var album = this.current.album;

    this.songs.add(new Song({
      album_cover: album.cover,
      album_name: album.name,
      author: album.author,
      name: song.name,
      length: song.length
    }));
  },

  addAlbum: function (name, album) {
    this.albums.add(new Album({
      name: name,
      author: album.author,
      cover: album.cover,
      year: album.year
    }));
  }

});

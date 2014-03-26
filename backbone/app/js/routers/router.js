Sfotipy.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "album/:name": "album"
  },

  initialize: function () {
    this.current = {};
    this.jsonData = {};
    this.albums = new Sfotipy.Collections.Albums();
    this.songs = new Sfotipy.Collections.Songs();
    this.playlist = new Sfotipy.Views.List({ collection: this.songs });
    this.player = new Sfotipy.Views.Player({ model: new Sfotipy.Models.Song() });
    this.albumlist = new Sfotipy.Views.Albums({ collection: this.albums });
    Backbone.history.start({ pushState: true });
  },

  index: function () {
    this.fetchData();
  },

  album: function (name) {
    if (Object.keys(this.jsonData) === 0) {
      this.fetchData();
    }

    this.songs.reset();
    this.current.album = this.jsonData[name];
    this.current.album.songs.forEach(this.addSong, this);
  },

  fetchData: function () {
    var self = this;

    // Load Data
    $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          self.addAlbum(name, data[name]);
        }
      }

    });
  },

  addSong: function (song) {
    var album = this.current.album;

    this.songs.add(new Sfotipy.Models.Song({
      album_cover: album.cover,
      album_name: album.name,
      author: album.author,
      name: song.name,
      length: song.length
    }));
  },

  addAlbum: function (name, album) {
    this.albums.add(new Sfotipy.Models.Album({
      name: name,
      author: album.author,
      cover: album.cover,
      year: album.year
    }));
  }

});

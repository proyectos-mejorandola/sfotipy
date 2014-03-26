Sfotipy.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "album/:name": "album"
  },

  initialize: function () {
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
    var self = this;

    if (Object.keys(this.jsonData) === 0) {
      this.fetchData();
    }

    this.songs.reset();

    var album = this.jsonData[name];

    album.songs.forEach(function (song) {
      self.songs.add(new Sfotipy.Models.Song({
        album_cover: album.cover,
        album_name: album.name,
        author: album.author,
        name: song.name,
        length: song.length
      }));
    });
  },

  fetchData: function () {
    var self = this;

    // Load Data
    $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      for (var name in data) {
        var album = data[name];

        self.albums.add(new Sfotipy.Models.Album({
          name: name,
          author: album.author,
          cover: album.cover,
          year: album.year
        }));
      }
    });
  }

});

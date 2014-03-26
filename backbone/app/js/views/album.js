Sfotipy.Views.Album = Backbone.View.extend({
  tagName: 'article',

  className: 'song',

  events: {
    'click figure': 'navigate'
  },

  template: Handlebars.compile($("#album-template").html()),

  initialize: function () {
    this.listenTo(this.model).on("change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
    return this;
  },

  navigate: function () {
    Sfotipy.app.navigate("album/" + this.model.get("name"), true);
  }

});


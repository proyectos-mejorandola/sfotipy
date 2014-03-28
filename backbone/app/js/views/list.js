var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    SongView   = require('../views/song'),
    $          = require('jquery');

module.exports = Backbone.View.extend({
  el: $(".playlist > .list"),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.render, this);
  },

  render: function () {
    this.$el.empty();
    this.addAll();
  },

  addOne: function (song) {
    var songView = new SongView({ model: song });
    this.$el.append(songView.render().el);
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});

var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  tagName: 'article',
  className: 'song',

  events: {
    'click': 'navigate'
  },

  template: Handlebars.compile($("#album-template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var album = this.model.toJSON()
    var html = this.template(album);
    this.$el.html(html);
    return this;
  },

  navigate: function () {
    Backbone.app.navigate("album/" + this.model.get("name"), { trigger: true });
  }

});

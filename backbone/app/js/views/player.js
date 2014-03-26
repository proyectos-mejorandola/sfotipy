Sfotipy.Views.Player = Backbone.View.extend({
  el: $(".music"),

  template: Handlebars.compile($("#player-template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    var song = this.model.toJSON();
    this.$el.html(this.template(song));
  }
});

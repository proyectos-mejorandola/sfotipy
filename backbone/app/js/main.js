var Backbone    = require('backbone'),
    Router      = require('./routers/router'),
    $           = require('jquery')
    Backbone.$  = $;

$(function () {
  Backbone.app = new Router();
});

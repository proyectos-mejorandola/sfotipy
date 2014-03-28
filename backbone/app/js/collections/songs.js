var Backbone = require('backbone'),
    Song     = require('../models/song');

module.exports = Backbone.Collection.extend({
  model: Song
});

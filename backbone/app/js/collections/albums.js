var Backbone = require('backbone'),
    Album    = require('../models/album');

module.exports = Backbone.Collection.extend({
  model: Album
});

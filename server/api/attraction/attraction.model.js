'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttractionSchema = new Schema({
  name: String,
  description: String,
  location: {type: [], index: '2d'},
  type: Number
});

module.exports = mongoose.model('Attraction', AttractionSchema);

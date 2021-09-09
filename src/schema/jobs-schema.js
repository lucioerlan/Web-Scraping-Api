const mongoose = require('mongoose');

const Jobs = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  data_publication: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('jobs', Jobs);

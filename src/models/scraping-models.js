const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

Jobs.plugin(mongoosePaginate);
module.exports = mongoose.model('jobs', Jobs);

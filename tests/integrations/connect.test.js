const mongoose = require('mongoose');
const Jobs = require('../../src/schema/jobs-schema');

const { URL } = require('../fixtures/mongo.test');

describe('Connection MongoDb', () => {
  it('If successful in connect MongoDB', (done) => {
    mongoose.connect(URL, (error) => {
      done(error);
    });
  });
});

describe('Delete Records', async () => {
  it('successful in deleting all records in Jobs', (done) => {
    Jobs.deleteMany((error) => {
      if (error) throw error;
    });
    done();
  });
});

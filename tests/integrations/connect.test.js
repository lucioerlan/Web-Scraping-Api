const mongoose = require('mongoose');
const Zip = require('../../src/modules/scraping/scraping-schema');

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
    Zip.deleteMany((error) => {
      if (error) throw error;
    });
    done();
  });
});

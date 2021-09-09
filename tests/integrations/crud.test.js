const assert = require('assert');
const Jobs = require('../../src/modules/scraping/scraping-schema');

let job;

describe('Creating Job', () => {
  it('creates a job', (done) => {
    job = new Jobs({ link: 'testeurl' });
    job.save().then(() => {
      assert(!job.isNew);
      done();
    });
  });
});

describe('Reading Job', () => {
  it('finds Jobs with the link of job', (done) => {
    Jobs.findOne({ link: 'testeurl' }).then(() => {
      assert(job.link === 'testeurl');
      done();
    });
  });
});

describe('Update Job', () => {
  it('update a job', (done) => {
    Jobs.findOneAndUpdate({ link: 'testeurl' }, { link: 'testeurl2' })
      .then(() => Jobs.findOne({ link: 'testeurl2' }))
      .then((res) => {
        assert(res.link === 'testeurl2');
        done();
      });
  });
});

describe('Jobs Delet', async () => {
  it('successful in deleting all records', (done) => {
    Jobs.deleteMany((error) => {
      if (error) throw error;
    });
    done();
  });
});

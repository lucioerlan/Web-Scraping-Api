const axios = require('axios');
const { load } = require('cheerio');
const { Cleaning, TagHtml } = require('../../utils');
const Jobs = require('../../schema/jobs-schema');

const getJobs = async () => {
  const data = await Jobs.find();

  if (data.length === 0) {
    await storeJobs();
  } else {
    await deleteJobs();
  }

  return data;
};

const storeJobs = async () => {
  const jobs = [];

  const { data } = await axios.get(TagHtml.urlSite);
  const $ = load(data);

  $(TagHtml.todasVagas).each((i, Elems) => {
    jobs.push({
      name: Cleaning($(Elems).find(TagHtml.dataPublicacao)),
      link: `https://www.${$(Elems).find('a').attr('href')}`,
      location: Cleaning($(Elems).find(TagHtml.vagaLocal)),
      description: Cleaning($(Elems).find(TagHtml.detalhes)),
      data_publication: Cleaning($(Elems).find(TagHtml.dataPublicacao)),
    });
  });

  Jobs.insertMany(jobs);
};

const deleteJobs = async () => {
  Jobs.deleteMany((error) => {
    if (error) throw new Error('no delete!');
  });

  return storeJobs();
};


module.exports = {
  getJobs
};

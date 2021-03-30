const axios = require('axios');
const { load } = require('cheerio');
const { logger } = require('../middlewares');
const { cleanupText, Util, WebConfig } = require('../utils');
const Jobs = require('../models/scraping-models');

const util = new Util();

/**
 * The Jobs API.
 *
 * @method show returns the data
 * @method prepare cycle through HTML elements
 * @method store insert the elements
 * @method delete delete the collection
 * @return Jobs Return Json With
 */


class scrapingController {
  constructor() {
    this.show = this.show.bind(this);
  }
  
  async show(req, res) {
    try {
      const data = await Jobs.find();

      if (data.length) {
        util.setSuccess(200, data, this.delete() );
      }
      
      if (!data.length) this.prepare();

      return util.send(res);
    } catch (err) {
      logger.error(err);
    }
  }


  async prepare() {
    try {
      const { data } = await axios.get(WebConfig.urlSite);
      const $ = load(data);

      $(WebConfig.todasVagas).each((i, Elems) => {
        this.store(Elems, $);
      });

    } catch (err) {
      logger.error(err);
    }
  }


  async store(Elems, $) {
    const jobs = [];

    jobs.push({
      name: cleanupText($(Elems).find(WebConfig.dataPublicacao)),
      link: `https://www.${$(Elems).find('a').attr('href')}`,
      location: cleanupText($(Elems).find(WebConfig.vagaLocal)),
      description: cleanupText($(Elems).find(WebConfig.detalhes)),
      data_publication: cleanupText($(Elems).find(WebConfig.dataPublicacao)),
    });

    Jobs.insertMany(jobs);
  }


  async delete() {
    try {
      
      await Jobs.deleteMany((error) => {
        if (error) throw new Error('no delete!');
      });

    } catch (err) {
      logger.error(err);
    }
  }
}


module.exports = scrapingController;

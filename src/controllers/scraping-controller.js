const axios = require('axios');
const cheerio = require('cheerio');
const Jobs = require('../models/scraping-models');
const WebConfig = require('../utils/webConfig');
const { logger } = require('../middlewares');

/**
 * The Jobs API.
 *
 * @method show Checks if the data already exists in mongoDB
 * @method store Scraps data and saves it to mongoDB
 * @return Jobs Return Json With
 */

class scrapingController {
  async show(req, res) {
    try {

      Jobs.find({}, { __v: 0 }, async (err, results) => {
        if (!err && results.length) {

          Jobs.deleteMany((error) => {
            if (error) throw error;
          });

          res.status(200).json({
            data: results,
            count: results.length,
          });

        } else {
          scrapingController.store();
        }
      });

    } catch (err) {
      logger.error(err);
    }
  }

  
  static async store() {
    try {
      const jobs = [];

      const { data } = await axios.get(WebConfig.urlSite);

      const $ = cheerio.load(data);

      const Elems = $(WebConfig.todasVagas);

      for (let i = 0; i < Elems.length; i += 1) {

        const name = $(Elems[i]).find(WebConfig.cargo)
        .text().trim().replace(/\n/g, '');

        const link = `https://www.${$(Elems[i]).find('a').attr('href')}`;

        const location = $(Elems[i]).find(WebConfig.vagaLocal)
        .text().trim().replace(/\n/g, '');

        const description = $(Elems[i]).find(WebConfig.detalhes)
        .text().trim().replace(/\n/g, '');

        const data_publication = $(Elems[i]).find(WebConfig.dataPublicacao)
        .text().trim().replace(/\n/g, '');

        jobs.push({
          name,
          link,
          location,
          description,
          data_publication,
        });
      }

      Jobs.insertMany(jobs); // Insert MongoDB

    } catch (err) {
      logger.error(err);
    }

  }
}

module.exports = scrapingController;

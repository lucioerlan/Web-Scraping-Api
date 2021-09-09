const { Util } = require('../../utils');
const { getJobs } = require('./scraping-models');

const util = new Util();

/**
 * The Jobs API.
 *
 * @return Receive payload
 */

class scrapingController {
  async show(req, res) {
    try {
      const data = await getJobs();

      if (data.length) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}

module.exports = scrapingController;

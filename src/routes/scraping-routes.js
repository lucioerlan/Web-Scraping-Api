const router = require('express').Router();

const ScrapingController = require('../controllers/scraping-controller');

const scrapingController = new ScrapingController();

router.get('/jobs', scrapingController.show);

module.exports = router;

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const websiteController = require('../controllers/websiteController');
const { validateWebsite } = require('../middleware/validation');

// Rate limiting
const analyzeLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

router.post('/analyze', analyzeLimit, validateWebsite, websiteController.analyzeWebsite);
router.get('/', websiteController.getAllWebsites);
router.put('/:id', websiteController.updateWebsite);
router.delete('/:id', websiteController.deleteWebsite);

module.exports = router;

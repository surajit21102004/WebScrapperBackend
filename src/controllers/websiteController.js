const Website = require('../models/Website');
const scraper = require('../utils/scraper');



class WebsiteController {
  async analyzeWebsite(req, res, next) {
    try {
      const { url } = req.body;

      // Scrape website
      const scrapedData = await scraper.scrapeWebsite(url);
      
      // Save to database
      const websiteData = {
        url: url,
        brand_name: scrapedData.brandName,
        description: scrapedData.description,
        title: scrapedData.title,
        enhanced_description: null
      };

      const savedWebsite = await Website.create(websiteData);

      res.status(201).json({
        message: 'Website analyzed successfully',
        data: savedWebsite
      });

    } catch (error) {
      next(error);
    }
  }

  async getAllWebsites(req, res, next) {
    try {
      const websites = await Website.findAll();
      res.json({
        message: 'Websites retrieved successfully',
        data: websites
      });
    } catch (error) {
      next(error);
    }
  }

  async updateWebsite(req, res, next) {
    try {
      const { id } = req.params;
      const updatedWebsite = await Website.update(id, req.body);
      
      res.json({
        message: 'Website updated successfully',
        data: updatedWebsite
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWebsite(req, res, next) {
    try {
      const { id } = req.params;
      await Website.delete(id);
      
      res.json({
        message: 'Website deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WebsiteController();
const Joi = require('joi');

const websiteSchema = Joi.object({
  url: Joi.string().uri().required()
});

const validateWebsite = (req, res, next) => {
  const { error } = websiteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  next();
};

module.exports = { validateWebsite };
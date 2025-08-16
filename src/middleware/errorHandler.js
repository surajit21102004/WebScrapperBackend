const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.message.includes('not accessible')) {
    return res.status(400).json({ error: 'Website not accessible' });
  }

  if (err.message.includes('already exists')) {
    return res.status(409).json({ error: 'Website already analyzed' });
  }

  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
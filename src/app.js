const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Add after existing middleware
const websiteRoutes = require('./routes/websiteRoutes');
const errorHandler = require('./middleware/errorHandler');
// Routes
app.use('/api/websites', websiteRoutes);


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Website Analyzer API',
    endpoints: {
      health: '/health',
      analyze: 'POST /api/websites/analyze'
    }
  });
});
// Error handling (must be last)
app.use(errorHandler);

module.exports = app;
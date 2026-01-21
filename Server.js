// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const businessRoutes = require('./routes/business');
const enquiryRoutes = require('./routes/enquiry');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


// Serve static files from the public folder
app.use(express.static('public'));

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Bizlead API by EIAR',
    version: '1.0.0',
    endpoints: {
      business: {
        register: 'POST /api/business/register',
        login: 'POST /api/business/login',
        getLeads: 'GET /api/business/:businessId/leads'
      },
      enquiry: {
        submit: 'POST /api/enquiry/submit',
        getDetails: 'GET /api/enquiry/:enquiryId'
      }
    }
  });
});

// API Routes
app.use('/api/business', businessRoutes);
app.use('/api/enquiry', enquiryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Endpoints: http://localhost:${PORT}/`);
});

const express = require('express');
const router = express.Router();
const { submitEnquiry, getEnquiry } = require('../controllers/enquiryController');

// POST /api/enquiry/submit - Submit buyer enquiry
router.post('/submit', submitEnquiry);

// GET /api/enquiry/:enquiryId - Get enquiry details
router.get('/:enquiryId', getEnquiry);

module.exports = router;

const express = require('express');
const router = express.Router();
const { registerBusiness, getBusinessLeads, loginBusiness, getBusinessSubscription } = require('../controllers/businessController');

// POST /api/business/login - Login with email and password
router.post('/login', loginBusiness);

// POST /api/business/register - Register business with subscription
router.post('/register', registerBusiness);

// GET /api/business/:businessId/subscription - Get fresh subscription data
router.get('/:businessId/subscription', getBusinessSubscription);

// GET /api/business/:businessId/leads - Get leads for a business
router.get('/:businessId/leads', getBusinessLeads);

module.exports = router;


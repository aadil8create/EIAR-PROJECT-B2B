const Business = require('../models/Business');
const Subscription = require('../models/Subscription');

// Register business with subscription preferences
exports.registerBusiness = async (req, res) => {
  try {
    const {
      businessName,
      email,
      password,
      phone,
      country,
      category,
      market,
      buyerType
    } = req.body;

    // Validate required fields
    if (!businessName || !email || !password || !category || !market || !buyerType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if business already exists
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: 'Business with this email already exists'
      });
    }

    // Create business
    const business = await Business.create({
      businessName,
      email,
      password, // In production, hash this!
      phone,
      country
    });

    // Create subscription
    const subscription = await Subscription.create({
      businessId: business._id,
      category,
      market,
      buyerType,
      isActive: true,
      leadCredits: 10 // Bonus: 10 free leads
    });

    res.status(201).json({
      success: true,
      message: 'Business registered successfully',
      data: {
        businessId: business._id,
        businessName: business.businessName,
        email: business.email,
        subscription: {
          category: subscription.category,
          market: subscription.market,
          buyerType: subscription.buyerType,
          leadCredits: subscription.leadCredits
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// Login business
exports.loginBusiness = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find business by email
    const business = await Business.findOne({ email: email.toLowerCase() });
    
    if (!business) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password (in production, use bcrypt.compare)
    if (business.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Get subscription details
    const subscription = await Subscription.findOne({ businessId: business._id });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        businessId: business._id,
        businessName: business.businessName,
        email: business.email,
        phone: business.phone,
        country: business.country,
        subscription: subscription ? {
          category: subscription.category,
          market: subscription.market,
          buyerType: subscription.buyerType,
          leadCredits: subscription.leadCredits
        } : null
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};


// Get business subscription (for refreshing credits)
exports.getBusinessSubscription = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Find subscription for this business
    const subscription = await Subscription.findOne({ businessId });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        category: subscription.category,
        market: subscription.market,
        buyerType: subscription.buyerType,
        leadCredits: subscription.leadCredits,
        isActive: subscription.isActive
      }
    });

  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription',
      error: error.message
    });
  }
};

// Get business leads
exports.getBusinessLeads = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Get all leads for this business with enquiry details
    const Lead = require('../models/Lead');
    const leads = await Lead.find({ businessId })
      .populate('enquiryId') // Get full enquiry details
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });

  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

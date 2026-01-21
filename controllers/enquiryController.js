const Enquiry = require('../models/Enquiry');
const { matchLeads } = require('../utils/matchLeads');

// Submit buyer enquiry
exports.submitEnquiry = async (req, res) => {
  try {
    const {
      buyerName,
      buyerEmail,
      buyerPhone,
      category,
      market,
      buyerType,
      productDescription,
      quantity,
      budget
    } = req.body;

    // Validate required fields
    if (!buyerName || !buyerEmail || !category || !market || !buyerType || !productDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create enquiry
    const enquiry = await Enquiry.create({
      buyerName,
      buyerEmail,
      buyerPhone,
      category,
      market,
      buyerType,
      productDescription,
      quantity,
      budget
    });

    // Match enquiry to businesses (automatic lead generation)
    const matchedLeads = await matchLeads(enquiry);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        enquiryId: enquiry._id,
        matchedBusinesses: matchedLeads.length,
        enquiry: {
          buyerName: enquiry.buyerName,
          category: enquiry.category,
          market: enquiry.market,
          buyerType: enquiry.buyerType,
          productDescription: enquiry.productDescription
        }
      }
    });

  } catch (error) {
    console.error('Submit enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting enquiry',
      error: error.message
    });
  }
};

// Get single enquiry details
exports.getEnquiry = async (req, res) => {
  try {
    const { enquiryId } = req.params;

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });

  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiry',
      error: error.message
    });
  }
};

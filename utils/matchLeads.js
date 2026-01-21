const Subscription = require('../models/Subscription');
const Lead = require('../models/Lead');

/**
 * Match an enquiry to relevant businesses and create leads
 * @param {Object} enquiry - The enquiry document
 * @returns {Array} Array of created leads
 */
async function matchLeads(enquiry) {
  try {
    console.log('Matching enquiry:', enquiry._id);

    // Find all active subscriptions matching the enquiry criteria
    const matchingSubscriptions = await Subscription.find({
      category: enquiry.category,
      market: enquiry.market,
      buyerType: enquiry.buyerType,
      isActive: true,
      leadCredits: { $gt: 0 } // Only businesses with remaining credits
    });

    console.log(`Found ${matchingSubscriptions.length} matching subscriptions`);

    const createdLeads = [];

    // Create lead for each matching subscription
    for (const subscription of matchingSubscriptions) {
      try {
        // Create lead (unique index prevents duplicates)
        const lead = await Lead.create({
          businessId: subscription.businessId,
          enquiryId: enquiry._id,
          status: 'new',
          matchedAt: new Date()
        });

        // Deduct lead credit (bonus feature)
        subscription.leadCredits -= 1;
        if (subscription.leadCredits === 0) {
          subscription.isActive = false; // Deactivate when credits run out
        }
        await subscription.save();

        createdLeads.push(lead);
        console.log(`Lead created for business ${subscription.businessId}`);

      } catch (error) {
        // Handle duplicate lead error (code 11000)
        if (error.code === 11000) {
          console.log(`Duplicate prevented for business ${subscription.businessId}`);
        } else {
          console.error('Error creating lead:', error.message);
        }
      }
    }

    console.log(`Total leads created: ${createdLeads.length}`);
    return createdLeads;

  } catch (error) {
    console.error('Match leads error:', error);
    throw error;
  }
}

module.exports = { matchLeads };

const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
    index: true
  },
  enquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enquiry',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['new', 'viewed', 'contacted', 'closed'],
    default: 'new'
  },
  matchedAt: {
    type: Date,
    default: Date.now
  },
  viewedAt: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Prevent duplicate leads: same business cannot receive the same enquiry twice
leadSchema.index({ businessId: 1, enquiryId: 1 }, { unique: true });

// Index for dashboard queries (get leads for specific business)
leadSchema.index({ businessId: 1, createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);

const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true, // For faster queries
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Electronics", "Furniture", "Clothing", "Food", "Automotive", "Construction", "Other"],
      trim: true,
    },
    market: {
      type: String,
      required: [true, "Market is required"],
      enum: ["UAE", "Saudi Arabia", "Europe", "Asia", "Other"],
      trim: true,
    },
    buyerType: {
      type: String,
      required: [true, "Buyer type is required"],
      enum: ["Retailer", "Wholesaler", "Distributor", "End User", "Other"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    leadCredits: {
      type: Number,
      default: 10, // Bonus feature: Free 10 leads
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster matching queries
subscriptionSchema.index({ category: 1, market: 1, buyerType: 1, isActive: 1 });

module.exports = mongoose.model("Subscription", subscriptionSchema);

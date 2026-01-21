const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: [true, "Buyer name is required"],
      trim: true,
    },
    buyerEmail: {
      type: String,
      required: [true, "Buyer email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    buyerPhone: {
      type: String,
      trim: true,
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
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    quantity: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
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

// Index for matching queries
enquirySchema.index({ category: 1, market: 1, buyerType: 1 });

module.exports = mongoose.model("Enquiry", enquirySchema);

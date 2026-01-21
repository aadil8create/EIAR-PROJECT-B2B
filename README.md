# Bizlead EIAR Project- B2B Lead Management Platform

A comprehensive B2B lead management platform built with Node.js, Express, and MongoDB. Bizlead connects businesses with potential buyers through an intelligent enquiry-to-lead matching system.

## Features

### For Businesses

- **Registration & Authentication**: Secure business account creation and login
- **Lead Dashboard**: View and manage matched leads from buyer enquiries
- **Lead Status Tracking**: Track lead status (new, viewed, contacted, closed)
- **Lead Notes**: Add notes to leads for better follow-up

### For Buyers

- **Enquiry Submission**: Submit detailed business enquiries with category and market preferences
- **Multiple Categories**: Support for Electronics, Furniture, Clothing, Food, Automotive, Construction, and more
- **Global Markets**: Target specific markets including UAE, Saudi Arabia, Europe, Asia, and others

### Platform Features

- **Intelligent Matching**: Automatic matching of buyer enquiries to relevant businesses
- **RESTful API**: Clean API endpoints for all operations
- **Responsive Dashboard**: Modern web interface for business management
- **MongoDB Integration**: Robust data storage with Mongoose ODM

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, JavaScript (Static files)
- **Authentication**: Custom JWT-based authentication
- **Middleware**: CORS, dotenv for environment management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eiar-project-b2b
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bizlead
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Business Routes

- `POST /api/business/register` - Register a new business
- `POST /api/business/login` - Business login
- `GET /api/business/:businessId/leads` - Get leads for a business

### Enquiry Routes

- `POST /api/enquiry/submit` - Submit a new enquiry
- `GET /api/enquiry/:enquiryId` - Get enquiry details

### General

- `GET /` - API information and available endpoints

## Project Structure

```
eiar-project-b2b/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── businessController.js # Business logic handlers
│   └── enquiryController.js  # Enquiry handlers
├── models/
│   ├── Business.js          # Business schema
│   ├── Enquiry.js           # Enquiry schema
│   ├── Lead.js              # Lead schema
│   └── Subscription.js      # Subscription schema
├── public/
│   ├── dashboard.html       # Business dashboard
│   ├── enquiry.html         # Enquiry submission form
│   ├── index.html           # Main dashboard page
│   ├── pricing.html         # Pricing information
│   ├── register.html        # Business registration
│   └── style.css            # Global styles
├── routes/
│   ├── business.js          # Business API routes
│   └── enquiry.js           # Enquiry API routes
├── utils/
│   └── matchLeads.js        # Lead matching logic
├── Server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## Database Models

### Business

- businessName: String (required)
- email: String (required, unique)
- password: String (required, min 6 chars)
- phone: String
- country: String
- createdAt: Date

### Enquiry

- buyerName: String (required)
- buyerEmail: String (required)
- buyerPhone: String
- category: String (enum: Electronics, Furniture, etc.)
- market: String (enum: UAE, Saudi Arabia, etc.)
- productDetails: String
- quantity: Number
- budget: Number
- timeline: String
- createdAt: Date

### Lead

- businessId: ObjectId (ref: Business)
- enquiryId: ObjectId (ref: Enquiry)
- status: String (enum: new, viewed, contacted, closed)
- matchedAt: Date
- viewedAt: Date
- notes: String

## Usage

1. **Business Registration**: Businesses can register through the web interface
2. **Buyer Enquiry**: Buyers submit enquiries specifying their requirements
3. **Lead Matching**: System automatically matches enquiries to relevant businesses
4. **Lead Management**: Businesses view and manage their leads through the dashboard

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (currently not implemented)



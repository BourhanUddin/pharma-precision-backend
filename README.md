# PharmaPrecision Pro - Backend 💊

The server-side API for the PharmaPrecision Pro Management System, built with Node.js and MongoDB.

## Features
- **RESTful API:** Clean endpoints for inventory and order management.
- **Data Validation:** Strict Mongoose schemas for order processing.
- **Security:** Configured with CORS and Dotenv for environment safety.
- **Error Handling:** Global middleware for consistent error responses.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose
- **Environment:** Dotenv

## Setup & Installation
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your credentials:
   ```text
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development

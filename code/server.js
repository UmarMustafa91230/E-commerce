const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration to fix the error
app.use(cors({
    origin: [
      process.env.CLIENT_URL || 'http://localhost:3000',
      process.env.FRONTEND_URL || 'http://localhost:5173'
    ], // Allow both React and Vite ports
    credentials: true               // Allow cookies/auth headers
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/products', require('./routes/productRoutes'));
app.use('/api/v1/orders', require('./routes/orderRoutes'));
app.use('/api/v1/cart', require('./routes/cartRoutes'));
app.use('/api/v1/offers', require('./routes/offerRoutes'));
app.use('/api/v1/payments', require('./routes/paymentRoutes'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server at: http://localhost:${PORT}/test`);
});

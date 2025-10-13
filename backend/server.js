const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug: Check if environment variables are loaded
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Not loaded');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not loaded');
console.log('PORT:', process.env.PORT || 'Not set');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both ports
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request entity too large' });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Routes
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'FrontierLMS Backend is running!', status: 'OK' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
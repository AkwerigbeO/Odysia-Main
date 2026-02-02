const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log('Environment loaded from:', path.resolve(__dirname, '.env'));
console.log('EMAIL_USER loaded:', !!process.env.EMAIL_USER);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const setupSecurity = require('./middleware/securityMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');

// Apply Security Middleware
setupSecurity(app);

app.use(express.json());

// Database Connection
// Database Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB Connected Successfully');
      // Initialize GridFS after connection
      const { initGridFS } = require('./config/gridfsConfig');
      initGridFS();
    })
    .catch((err) => {
      console.error('MongoDB Connection Error:', err);
      process.exit(1); // Exit process with failure
    });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/expert', require('./routes/expertRoutes'));
app.use('/api/expert-applications', require('./routes/expertAppRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/files', require('./routes/uploadRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handler (must be last middleware)
app.use(errorHandler);

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/faculties', require('./routes/faculties'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/institution', require('./routes/institution'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/uploads', require('./routes/uploads'));

// Academic SWO (Student Welfare & Outcome) Routes
app.use('/api/academic-swo/faculty-feedback', require('./routes/academic-faculty-feedback'));
app.use('/api/academic-swo/institution-feedback', require('./routes/academic-institution-feedback'));
app.use('/api/academic-swo/graduate-exit-survey', require('./routes/academic-graduate-exit-survey'));
app.use('/api/academic-swo/feedback-reports', require('./routes/academic-feedback-reports'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Education Portal API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;


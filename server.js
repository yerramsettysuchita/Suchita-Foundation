const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/suchita_foundation')
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Import Routes
const pagesRouter = require('./routes/pages');
const donationRouter = require('./routes/donations');
const interventionsRouter = require('./routes/interventions');
const searchRouter = require('./routes/search');

// Use Routes
app.use('/api/pages', pagesRouter);
app.use('/api/donations', donationRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/search', searchRouter);

// Define specific routes before the catch-all route
app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/interventions/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/our-work', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'our-work.html'));
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
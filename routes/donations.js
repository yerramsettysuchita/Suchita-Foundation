const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation.js');

router.post('/', async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
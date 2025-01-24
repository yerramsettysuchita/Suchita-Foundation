const express = require('express');
const router = express.Router();
const Intervention = require('../models/Intervention.js');

router.get('/', async (req, res) => {
    try {
        const interventions = await Intervention.find();
        res.json(interventions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
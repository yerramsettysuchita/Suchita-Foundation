const express = require('express');
const router = express.Router();
const Page = require('../models/Pages.js');
const Intervention = require('../models/Intervention.js');

// Search across all content types
router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        // Search in pages
        const pageResults = await Page.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                { metaDescription: { $regex: searchTerm, $options: 'i' } }
            ]
        }).select('title slug content metaDescription -_id');

        // Search in interventions
        const interventionResults = await Intervention.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { details: { $regex: searchTerm, $options: 'i' } }
            ]
        }).select('title description image -_id');

        // Combine and format results
        const formattedResults = {
            pages: pageResults.map(page => ({
                type: 'page',
                title: page.title,
                url: `/pages/${page.slug}`,
                preview: page.metaDescription || page.content.substring(0, 200) + '...'
            })),
            interventions: interventionResults.map(intervention => ({
                type: 'intervention',
                title: intervention.title,
                url: `/interventions/${intervention._id}`,
                preview: intervention.description.substring(0, 200) + '...',
                image: intervention.image
            }))
        };

        // Add metadata about the search
        const response = {
            query: searchTerm,
            totalResults: pageResults.length + interventionResults.length,
            results: formattedResults
        };

        res.json(response);

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            message: 'Error performing search', 
            error: error.message 
        });
    }
});

// Advanced search with filters
router.get('/advanced', async (req, res) => {
    try {
        const {
            q: searchTerm,
            type,
            sortBy = 'relevance',
            limit = 10,
            page = 1
        } = req.query;

        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const searchQuery = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } }
            ]
        };

        // Add type filter if specified
        if (type) {
            searchQuery.type = type;
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Perform search with pagination
        let results;
        let total;

        if (!type || type === 'page') {
            results = await Page.find(searchQuery)
                .select('title slug content createdAt -_id')
                .sort(getSortCriteria(sortBy))
                .skip(skip)
                .limit(parseInt(limit));

            total = await Page.countDocuments(searchQuery);
        }

        if (!type || type === 'intervention') {
            const interventionResults = await Intervention.find(searchQuery)
                .select('title description image createdAt -_id')
                .sort(getSortCriteria(sortBy))
                .skip(skip)
                .limit(parseInt(limit));

            results = results ? [...results, ...interventionResults] : interventionResults;
            total = total ? total + await Intervention.countDocuments(searchQuery) : await Intervention.countDocuments(searchQuery);
        }

        // Format response with pagination info
        const response = {
            query: searchTerm,
            type: type || 'all',
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalResults: total,
            results: results.map(formatSearchResult)
        };

        res.json(response);

    } catch (error) {
        console.error('Advanced search error:', error);
        res.status(500).json({ 
            message: 'Error performing advanced search', 
            error: error.message 
        });
    }
});

// Helper function to get sort criteria
function getSortCriteria(sortBy) {
    switch (sortBy) {
        case 'date':
            return { createdAt: -1 };
        case 'title':
            return { title: 1 };
        case 'relevance':
        default:
            return { score: { $meta: 'textScore' } };
    }
}

// Helper function to format search results
function formatSearchResult(result) {
    const baseFormat = {
        id: result._id,
        title: result.title,
        type: result.constructor.modelName.toLowerCase(),
        createdAt: result.createdAt
    };

    if (result.slug) {  // Page result
        return {
            ...baseFormat,
            url: `/pages/${result.slug}`,
            preview: result.content.substring(0, 200) + '...'
        };
    } else {  // Intervention result
        return {
            ...baseFormat,
            url: `/interventions/${result._id}`,
            preview: result.description.substring(0, 200) + '...',
            image: result.image
        };
    }
}

module.exports = router;
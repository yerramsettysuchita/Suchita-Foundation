const mongoose = require('mongoose');
const Page = require('./models/Pages.js');

mongoose.connect('mongodb://127.0.0.1:27017/suchita_foundation')
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Create a test page
        const testPage = new Page({
            title: 'Test Page',
            slug: 'test-page',
            content: 'This is a test page'
        });

        await testPage.save();
        console.log('Test page created successfully');
        
        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Error:', error);
    });